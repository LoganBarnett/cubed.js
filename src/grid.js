// @flow

import type { Vector3 } from './vector.js'
import type { Side } from './mesh.js'
import type { Chunk } from './chunk.js'

const R = require('ramda');

const vector = require('./vector');
const chunk = require('./chunk');

const grid = {};

export type Grid<T> = Array<Array<Array<T>>>
export type GetterFn<T> = (emptyCell: T, g: Grid<T>, pos: Vector3) => T
export type GridCell<T> = {
  position: Vector3,
  value: T,
}

grid.getIdentity = <T>(emptyCell: T): Grid<T> => {
  return grid.create({
    size: {x: 0, y: 0, z: 0},
    fillEmptyWith: emptyCell,
    values: [],
  })
}

type GridArgs<T> = {
  size?: Vector3,
  // voxelTypes?: Array,
  fillEmptyWith: T,
  values?: Array<GridCell<T>>,
}

grid.create = <T>(args: GridArgs<T>): Grid<T> => {
  var size = args.size;
  if(size == null) {
    return grid.getIdentity(args.fillEmptyWith);
  }
  if(args.size == null || !vector.isValid(args.size)) {
    return grid.getIdentity(args.fillEmptyWith);
  }
  var values = args.values || [];
  var g = new Array(size.x);
  for(var x = 0; x < g.length; ++x) {
    var yArray = g[x] = new Array(size.y);
    for(var y = 0; y < yArray.length; ++y) {
      var zArray = yArray[y] = new Array(size.z);
      for(var z = 0; z < zArray.length; ++z) {
        zArray[z] = args.fillEmptyWith
      }
    }
  }

  R.forEach(function(tuple) {
    var position = tuple.position;
    var value = tuple.value;
    g[position.x][position.y][position.z] = value;
  }, values);
  return g;
};

grid.set = <T>(
  emptyCell: T,
  g: Grid<T>,
  p: Vector3,
  v: T
): Grid<T> => {
  if(!grid.isInBounds(g, p)) {
    return g;
  }
  const cells = grid.flatten(emptyCell, g);
  // TODO: Handle out of bounds
  const removed = R.filter(({position, value}) => p != position, cells);
  const added = R.append({position: p, value: v}, removed);
  return grid.create({
    size: grid.getSize(g),
    values: added,
    fillEmptyWith: emptyCell,
  });
};

grid.isInBounds = <T>(g: Grid<T>, p: Vector3): bool => {
  const size = grid.getSize(g);
  if(p.x < 0 || p.y < 0 || p.z < 0) {
    return false;
  }
  else if(size.x > p.x && size.y > p.y && size.z > p.z) {
    return true;
  }
  else {
    return false;
  }
};

grid.get = <T>(emptyCell: T, g: Grid<T>, position: Vector3): T => {
  if(!grid.isInBounds(g, position)) return emptyCell;
  var xArray = g[position.x];
  if(xArray === null) return emptyCell;
  var yArray = xArray[position.y];
  if(yArray === null) return emptyCell;
  return yArray[position.z];
}

grid.getSize = <T>(g: Grid<T>): Vector3 => {
  if(g != null && g[0] != null && g[0][0] != null) {
    var x = g.length;
    var y = g[0].length;
    var z = g[0][0].length;
    return {x: x, y: y, z: z};
  }
  else {
    return { x: 0, y: 0, z: 0 };
  }
}

grid.generate = <T>(
  matIndex: (p: Vector3, s: Side, v: T) => number,
  emptyCell: T,
  g: Grid<T>,
  chunkSize: Vector3,
  voxelSize: number,
): Grid<Chunk> => {
  var gridSize = grid.getSize(g);
  var chunkXLength = parseInt(gridSize.x / chunkSize.x);
  var chunkYLength = parseInt(gridSize.y / chunkSize.y);
  var chunkZLength = parseInt(gridSize.z / chunkSize.z);


  if(gridSize.x % chunkSize.x != 0) ++chunkXLength;
  if(gridSize.y % chunkSize.y != 0) ++chunkYLength;
  if(gridSize.z % chunkSize.z != 0) ++chunkZLength;

  var chunkDimensions = {x: chunkXLength, y: chunkYLength, z: chunkZLength};
  var chunks = [];
  for(var x = 0; x < chunkXLength; ++x) {
    for(var y = 0; y < chunkYLength; ++y) {
      for(var z = 0; z < chunkZLength; ++z) {
        var position = {x: x, y: y, z: z};
        var chunkMeshData = chunk.generate(
          matIndex,
          emptyCell,
          g,
          grid.get,
          chunkSize,
          position,
          voxelSize
        );
        chunks.push({position: position, value: chunkMeshData});
      }
    }
  }
  var chunkGrid = grid.create({
    size: chunkDimensions,
    values: chunks,
    fillEmptyWith: chunk.empty,
  })
  return chunkGrid;
};

export type GridIteratorResult<T> = {
  done: bool,
  value: GridCell<T>,
}

export type GridIterator<T> = {
  next: () => GridIteratorResult<T>,
}

grid.getIterator = <T>(emptyCell: T, g: Grid<T>): GridIterator<T> => {
  let x = 0
  let y = 0
  let z = 0
  const gridSize = grid.getSize(g)
  let lastCell = false

  const iterator = {
    next: (): GridIteratorResult<T> => {
      let done = lastCell
      if(done) {
        return {
          done: true,
          value: { position: {x: 0, y: 0, z: 0}, value: emptyCell},
        }
      }
      else {
        var position = {x: x, y: y, z: z};
        ++x;
        if(x >= gridSize.x) {
          x = 0
          ++y
          if(y >= gridSize.y) {
            y = 0
            ++z
            if(z >= gridSize.z) {
              lastCell = true
            }
          }
        }
        const cellValue = grid.get(emptyCell, g, position)
        const iteration = {
          done: done,
          value: {position: position, value: cellValue},
        };
        return iteration
      }
    },
    // TODO: Polyfill this or something
    [Symbol.iterator]: () => iterator,
  }
  return iterator
}

// Gives back a flat list of {position, value} for each cell.
grid.flatten = <T>(emptyCell: T, g: Grid<T>): Array<GridCell<T>> => {
  var values = [];
  var iterator = grid.getIterator(emptyCell, g);
  while(true) {
    const value = iterator.next()
    if(value.done) {
      break;
    }
    values.push(value.value);
  }
  return values;
};


var logged = false;
grid.merge = <T>(
  emptyCell: T,
  finalGrid: Grid<T>,
  currentGrid: Grid<T>
): Grid<T> => {
  // it appears lodash doesn't work with the new iterator...
  //const voxels = _.map(grid.getIterator(finalGrid), ({position, voxel}) => {
  var values = R.map(function(cell) {
    var position = cell.position;
    var value = cell.value;
    const currentValue = grid.get(emptyCell, currentGrid, position);
    const newValue = currentValue === emptyCell ? value : currentValue
    return {position: position, value: newValue};
  }, grid.flatten(emptyCell, finalGrid));
  var newGrid = grid.create({
    size: grid.getSize(finalGrid),
    values: values,
    fillEmptyWith: emptyCell,
  })
  return newGrid
}

grid.blit = <T>(
  emptyCell: T,
  target: Grid<T>,
  offset: Vector3,
  source: Grid<T>
): Grid<T> => {
  const newValues = R.map((cell) => {
    const offsetCellPosition = vector.plus(cell.position, offset)
    const newCell = { value: cell.value, position: offsetCellPosition }
    return newCell
  }, grid.flatten(emptyCell, source))
  const targetValues = grid.flatten(emptyCell, target)
  const presentNewValues = R.filter((a) => a.value === emptyCell, newValues)
  R.forEach(({ position, value }) => {
    const t = R.find((gridVal) => gridVal.position == position, targetValues)
    if(t) {
      t.value = value
    }
    else {
      targetValues.push({ position, value })
    }
  }, presentNewValues)

  const newGrid = grid.create({
    size: grid.getSize(target),
    fillEmptyWith: emptyCell,
    values: targetValues,
  })
  return newGrid
}

module.exports = grid

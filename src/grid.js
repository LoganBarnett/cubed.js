'use strict';

const R = require('ramda');

const vector = require('./vector');
const chunk = require('./chunk');

const grid = {};

var getIdentity = function() {
  if(grid.identity == null) {
    grid.identity = grid.create({size: {x: 0, y: 0, z: 0}});
  }
  return grid.identity;
};

grid.create = function(args) {
  var size = args.size;
  if(size == null) {
    return getIdentity();
  }
  if(!vector.isValid(args.size)) {
    return getIdentity();
  }
  var voxelTypes = args.voxelTypes;
  var values = args.values || [];
  //this.size = size;
  //if(voxelTypes) {
  //  this.voxelTypes = voxelTypes;
  //  this.voxelTypesLookup = {};
  //  voxelTypes.forEach(function(v) { this.voxelTypesLookup[v.name] = v; }, this);
  //}
  //else {
  //  this.voxelTypes = [];
  //}
  const fillEmptyWith = args.fillEmptyWith == null ? null : args.fillEmptyWith
  var g = new Array(size.x);
  for(var x = 0; x < g.length; ++x) {
    var yArray = g[x] = new Array(size.y);
    for(var y = 0; y < yArray.length; ++y) {
      var zArray = yArray[y] = new Array(size.z);
      for(var z = 0; z < zArray.length; ++z) {
        zArray[z] = fillEmptyWith
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

grid.set = (emptyCell, g, p, v) => {
  if(!grid.isInBounds(g, p)) {
    return g;
  }
  const cells = grid.flatten(emptyCell, g);
  // TODO: Handle out of bounds
  const removed = R.drop(({position, value}) => p == position, cells);
  const added = R.append({position: p, value: v}, removed);
  return grid.create({
    size: grid.getSize(g),
    values: added,
    fillWithEmpty: emptyCell,
  });
};

grid.isInBounds = (g, p) => {
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

grid.get = function(emptyCell, g, position) {
  if(!grid.isInBounds(g, position)) return emptyCell;
  var xArray = g[position.x];
  if(xArray === null) return emptyCell;
  var yArray = xArray[position.y];
  if(yArray === null) return emptyCell;
  return yArray[position.z];
};

grid.getSize = function(g) {
  if(g != null && g[0] != null && g[0][0] != null) {
    var x = g.length;
    var y = g[0].length;
    var z = g[0][0].length;
    return {x: x, y: y, z: z};
  }
  else {
    return { x: 0, y: 0, z: 0 };
  }
};

grid.generate = (emptyCell, g, chunkSize, voxelSize, voxelTypes) => {
  var gridSize = grid.getSize(g);
  var chunkXLength = parseInt(gridSize.x / chunkSize.x);
  var chunkYLength = parseInt(gridSize.y / chunkSize.y);
  var chunkZLength = parseInt(gridSize.z / chunkSize.z);


  if(gridSize.x % chunkSize.x != 0) ++chunkXLength;
  if(gridSize.y % chunkSize.y != 0) ++chunkYLength;
  if(gridSize.z % chunkSize.z != 0) ++chunkZLength;

  var chunkDimensions = {x: chunkXLength, y: chunkYLength, z: chunkZLength};
  var chunks = [];
  const get = R.curry(grid.get)(emptyCell)
  for(var x = 0; x < chunkXLength; ++x) {
    for(var y = 0; y < chunkYLength; ++y) {
      for(var z = 0; z < chunkZLength; ++z) {
        var position = {x: x, y: y, z: z};
        var chunkMeshData = chunk.generate(
          emptyCell,
          g,
          get,
          chunkSize,
          position,
          voxelSize
        );
        chunks.push({position: position, value: chunkMeshData});
      }
    }
  }
  var chunkGrid = grid.create({size: chunkDimensions, values: chunks});
  return chunkGrid;
};

grid.getIterator = (emptyCell, g) => {
  var iterator = {};
// TODO: Polyfill this or something
  iterator[Symbol.iterator] = function() {
    return iterator;
  };
  var x = 0;
  var y = 0;
  var z = 0;
  var gridSize = grid.getSize(g);
  var lastCell = false;
  iterator.next = function() {
    var done = lastCell;
    if(done) {
      return {
        done: true,
        value: emptyCell,
      };
    }
    else {
      var position = {x: x, y: y, z: z};
      ++x;
      if(x >= gridSize.x) {
        x = 0;
        ++y;
        if(y >= gridSize.y) {
          y = 0;
          ++z;
          if(z >= gridSize.z) {
            lastCell = true;
          }
        }
      }
      var cellValue = grid.get(emptyCell, g, position);
      var iteration = {
        done:    done
        , value: {position: position, value: cellValue}
      };
      return iteration;
    }
  };
  return iterator;
};

// gives back a flat list of {position, value} for each cell
grid.flatten = (emptyCell, g) => {
  var values = [];
  var iterator = grid.getIterator(emptyCell, g);
  while(true) {
    var value = iterator.next();
    if(value.done) {
      break;
    }
    values.push(value.value);
  }
  return values;
};


var logged = false;
grid.merge = (emptyCell, finalGrid, currentGrid) => {
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

grid.blit = R.curry((emptyCell, target, offset, source) => {
  const newValues = R.map((cell) => {
    const offsetCellPosition = vector.plus(cell.position, offset)
    const newCell = { value: cell.value, position: offsetCellPosition }
    return newCell
  }, grid.flatten(emptyCell, source))
  const targetValues = grid.flatten(emptyCell, target)
  const presentNewValues = R.filter((a) => {
    return a.value.name != emptyCell.name
  }, newValues)
  R.forEach(({ position, value }) => {
    // targetValues[position.x][position.y][position.z] = { position, value }
    const t = R.find((gridVal) => gridVal.position == position, targetValues)
    if(t) {
      t.value = value
    }
    else {
      targetValues.push({ position, value })
    }
  }, presentNewValues)
  // console.log('size', grid.getSize(target))
  const newGrid = grid.create({
    size: grid.getSize(target),
    fillEmptyWith: emptyCell,
    values: targetValues,
  })
  return newGrid
})

grid.identity = getIdentity()

module.exports = grid

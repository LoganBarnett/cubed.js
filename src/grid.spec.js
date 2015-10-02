'use strict';

const grid = require('./grid');
// The grid is really just a 3d array.
// Some example usage:
// var cubes = [ [{x: 1, y: 1, z: 1}, {}] ];
// const g = grid.create({size: {x: 3, y: 3, z: 3}, values: cubes});
describe('grid', function() {
  describe('creation', () => {
    it('can be created with a voxel set', function() {
      var voxels = [ {position: {x: 1, y: 2, z: 0}, value: {}} ];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});
      expect(g[1][2][0]).not.toEqual(null);
    });

    it('can be created with no voxels provided', function() {
      const g = grid.create({size: {x: 1, y: 1, z: 1}});
      expect(g).toEqual([ [ [null] ] ] );
    });

    it('is created using the width provided in size', function() {
      const g = grid.create({size: {x: 1, y: 2, z: 3}});
      expect(g.length).toEqual(1);
    });

    it('is created using the height provided in size', function() {
      const g = grid.create({size: {x: 1, y: 2, z: 3}});
      expect(g[0].length).toEqual(2);
    });

    it('is created using the depth provided in size', function() {
      const g = grid.create({size: {x: 1, y: 2, z: 3}});
      expect(g[0][0].length).toEqual(3);
    });
  });

  describe('getting', () => {
    it('gets voxels at a given vector', function() {
      var voxels = [ {position: {x: 1, y: 2, z: 0}, value: {voxelType: 'block'}} ];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});
      var voxel = grid.get(g, {x: 1, y: 2, z: 0});
      expect(voxel).toEqual({voxelType: 'block'});
    });

    it('returns falsy when getting a vector out of the X bounds', function() {
      var voxels = [ {position: {x: 0, y: 0, z: 0}, value: {voxelType: 'block'}} ];
      const g = grid.create({size: {x: 1, y: 1, z: 1}, values: voxels});
      var voxel = grid.get(g, {x: 1, y: 0, z: 0});
      expect(voxel).toBeFalsy();
    });

    it('returns falsy when getting a vector out of the Y bounds', function() {
      var voxels = [ {position: {x: 0, y: 0, z: 0}, value: {voxelType: 'block'}} ];
      const g = grid.create({size: {x: 1, y: 1, z: 1}, values: voxels});
      var voxel = grid.get(g, {x: 0, y: 1, z: 0});
      expect(voxel).toBeFalsy();
    });

    it('returns falsy when getting a vector out of the Z bounds', function() {
      var voxels = [ {position: {x: 0, y: 0, z: 0}, value: {voxelType: 'block'}} ];
      const g = grid.create({size: {x: 1, y: 1, z: 1}, values: voxels});
      var voxel = grid.get(g, {x: 0, y: 0, z: 1});
      expect(voxel).toBeFalsy();
    });

    it('gets the size of a grid', function() {
      const g = grid.create({size: {x: 1, y: 2, z: 3}, values: []});
      const gridSize = grid.getSize(g);
      expect(gridSize).toEqual({x: 1, y: 2, z: 3});
    });
  });

  describe('bounds', () => {
    it('returns true if the position is within bounds of the grid', () => {
      const g = grid.create({size: {x: 1, y: 2, z: 3}, values: []});
      const result = grid.isInBounds(g, {x: 0, y: 0, z: 0});
      expect(result).toBe(true);
    });

    it('returns false if the position is outside bounds of the grid', () => {
      const g = grid.create({size: {x: 1, y: 2, z: 3}, values: []});
      const result = grid.isInBounds(g, {x: 1, y: 0, z: 0});
      expect(result).toBe(false);
    });

    it('returns false for negative positions', () => {
      const g = grid.create({size: {x: 1, y: 2, z: 3}, values: []});
      const result = grid.isInBounds(g, {x: -1, y: 0, z: 0});
      expect(result).toBe(false);
    });
  });

  describe('setting', () => {
    it('returns a new grid with the value set at the location provided', () => {
      const g = grid.create({size: {x: 1, y: 2, z: 3}, values: []});
      const result = grid.set(g, {x: 0, y: 0, z: 0}, {foo: 'bar'});
      expect(result).toEqual([
        [
            [{foo: 'bar'}, null, null]
          , [null, null, null]
        ]
      ]);
    });

    it('does not change a grid when the position is out of bounds', () => {
      const g = grid.create({size: {x: 1, y: 2, z: 3}, values: []});
      const result = grid.set(g, {x: 0, y: 0, z: 5}, {foo: 'bar'});
      expect(result).toEqual([
        [
            [null, null, null]
          , [null, null, null]
        ]
      ]);
    });
  });

  describe('validation', function() {
    it('creates an identity grid when missing a size', function() {
      const g = grid.create({foo: 'bar'});
      expect(g).toEqual(grid.identity);
    });

    it('creates an identity grid when the size is malformed', function() {
      const g = grid.create({size: {v: 0, y: 1, z: 2}});
      expect(g).toEqual(grid.identity);
    });
  });

  describe('chunk generation', function() {
    it('creates a grid of chunks', function() {
      const g = grid.create({size: {x: 1, y: 1, z: 1}});

      var chunkGrid = grid.generate(g, {x: 16, y: 16, z: 16}, 1);

      expect(grid.getSize(chunkGrid)).toEqual({x: 1, y: 1, z: 1});
    });

    it('creates a chunk for a small grid', function() {
      const g = grid.create({size: {x: 1, y: 1, z: 1}});

      var chunkGrid = grid.generate(g, {x: 16, y: 16, z: 16}, 1);

      expect(grid.get(chunkGrid, {x: 0, y: 0, z: 0})).not.toEqual(null);
    });

    it('creates multiple chunks for large grids', function() {
      const g = grid.create({size: {x: 1, y: 1, z: 32}});

      var chunkMeshes = grid.generate(g, {x: 16, y: 16, z: 16}, 1);

      expect(grid.getSize(chunkMeshes)).toEqual({x: 1, y: 1, z: 2});
    });

    xit('accepts voxel types to use for generation', function() {
      var voxels = [{position: {x: 0, y: 0, z: 0}, value: {}}];
      const g = grid.create({size: {x: 1, y: 1, z: 1}, values: voxels});
      var voxelType = new VoxelType('test type');
      var voxelTypes = [voxelType];

      grid.generate(g, {x: 16, y: 16, z: 16}, 1, voxelTypes);

      //expect(cubedObject.chunks.voxelTypes.length).toEqual(1);
      //expect(cubedObject.chunks.voxelTypes[0]).toEqual(voxelType);
    });

  });

  xdescribe('iteration', function() {
    it('loops over all locations in a grid', function() {
      const g = grid.create({size: {x: 1, y: 2, z: 3}});

      var cells = [];

      var iterator = grid.getIterator(g)[Symbol.iterator];
      while(true) {
        var cell = iterator.next();
        if(cell.done) {
          break;
        }
        cells.push(cell.value);
      }

      expect(cells.length).toEqual(6);
    });
  });

  it('has a value of null for the "done" iteration', function() {
    const g = grid.create({size: {x: 1, y: 2, z: 3}});

    var cells = [];

    var iterator = grid.getIterator(g);
    while(true) {
      var cell = iterator.next();
      if(cell.done) {
        break;
      }
      cells.push(cell.value);
    }

    expect(cells[5].value).toBe(null);
  });

  it('provides the cell value at each cell', function() {
    var voxels = [
        {position: {x: 0, y: 0, z: 0}, value: {foo: 'bar'}}
      , {position: {x: 0, y: 1, z: 0}, value: {bazz: 'qux'}}
      , {position: {x: 0, y: 1, z: 1}, value: {quxx: 'quxxx'}}
    ];
    const g = grid.create({size: {x: 1, y: 2, z: 2}, values: voxels});

    var cells = [];

    var iterator = grid.getIterator(g);
    while(true) {
      var cell = iterator.next();
      if(cell.done) {
        break;
      }
      cells.push(cell.value);
    }

    expect(cells).toEqual([
        {position: {x: 0, y: 0, z: 0}, value: {foo: 'bar'}}
      , {position: {x: 0, y: 1, z: 0}, value: {bazz: 'qux'}}
      , {position: {x: 0, y: 0, z: 1}, value: null}
      , {position: {x: 0, y: 1, z: 1}, value: {quxx: 'quxxx'}}
    ]);
  });

  /*
  describe('texture atlas', function() {
    it('does not require a voxel atlas', function() {
      const g = grid.create({size: {x: 1, y: 2, z: 3}});
      expect(grid).toEqual([ [ [null] ] ] );
    });

    it('always has a list of voxel types even if none were provided', function() {
      const g = new GRID({x: 2, y: 2, z: 2});
      expect(grid.voxelTypes).toEqual([]);
    });

    it('accepts a list of voxel types', function() {
      var voxelTypes = [
          new VoxelType('foo')
        , new VoxelType('bar')
        , new VoxelType('bazz')
      ];
      const g = new GRID({x: 2, y: 2, z: 2}, voxelTypes);

      expect(grid.voxelTypes[0].name).toContain('foo');
      expect(grid.voxelTypes[1].name).toContain('bar');
      expect(grid.voxelTypes[2].name).toContain('bazz');
    });
  });
  */
});

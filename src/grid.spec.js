'use strict';

// The grid is really just a 3d array.
// Some example usage:
// var cubes = [ [{x: 1, y: 1, z: 1}, {}] ];
// var grid = cubed.grid.create({size: {x: 3, y: 3, z: 3}, values: cubes});
(function(cubed) {
  describe('grid', function() {
    it('can be created with a voxel set', function() {
      var voxels = [ {position: {x: 1, y: 2, z: 0}, voxel: {}} ];
      var grid = cubed.grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});
      expect(grid[1][2][0]).not.toEqual(null);
    });

    it('can be created with no voxels provided', function() {
      var grid = cubed.grid.create({size: {x: 1, y: 1, z: 1}});
      expect(grid).toEqual([ [ [null] ] ] );
    });

    it('is created using the width provided in size', function() {
      var grid = cubed.grid.create({size: {x: 1, y: 2, z: 3}});
      expect(grid.length).toEqual(1);
    });

    it('is created using the height provided in size', function() {
      var grid = cubed.grid.create({size: {x: 1, y: 2, z: 3}});
      expect(grid[0].length).toEqual(2);
    });

    it('is created using the depth provided in size', function() {
      var grid = cubed.grid.create({size: {x: 1, y: 2, z: 3}});
      expect(grid[0][0].length).toEqual(3);
    });

    it('gets voxels at a given vector', function() {
      var voxels = [ {position: {x: 1, y: 2, z: 0}, voxel: {voxelType: 'block'}} ];
      var grid = cubed.grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});
      var voxel = cubed.grid.get(grid, {x: 1, y: 2, z: 0});
      expect(voxel).toEqual({voxelType: 'block'});
    });

    it('returns falsy when getting a vector out of the X bounds', function() {
      var voxels = [ {position: {x: 0, y: 0, z: 0}, voxel: {voxelType: 'block'}} ];
      var grid = cubed.grid.create({size: {x: 1, y: 1, z: 1}, values: voxels});
      var voxel = cubed.grid.get(grid, {x: 1, y: 0, z: 0});
      expect(voxel).toBeFalsy();
    });

    it('returns falsy when getting a vector out of the Y bounds', function() {
      var voxels = [ {position: {x: 0, y: 0, z: 0}, voxel: {voxelType: 'block'}} ];
      var grid = cubed.grid.create({size: {x: 1, y: 1, z: 1}, values: voxels});
      var voxel = cubed.grid.get(grid, {x: 0, y: 1, z: 0});
      expect(voxel).toBeFalsy();
    });

    it('returns falsy when getting a vector out of the Z bounds', function() {
      var voxels = [ {position: {x: 0, y: 0, z: 0}, voxel: {voxelType: 'block'}} ];
      var grid = cubed.grid.create({size: {x: 1, y: 1, z: 1}, values: voxels});
      var voxel = cubed.grid.get(grid, {x: 0, y: 0, z: 1});
      expect(voxel).toBeFalsy();
    });

    it('gets the size of a grid', function() {
      var grid = cubed.grid.create({size: {x: 1, y: 2, z: 3}, values: []});
      var gridSize = cubed.grid.getSize(grid);
      expect(gridSize).toEqual({x: 1, y: 2, z: 3});
    });

    describe('validation', function() {
      it('creates an identity grid when missing a size', function() {
        var grid = cubed.grid.create({foo: 'bar'});
        expect(grid).toEqual(cubed.grid.identity);
      });

      it('creates an identity grid when the size is malformed', function() {
        var grid = cubed.grid.create({size: {v: 0, y: 1, z: 2}});
        expect(grid).toEqual(cubed.grid.identity);
      });
    });

    describe('chunk generation', function() {
      it('creates a chunk for a small grid', function() {
        var grid = cubed.grid.create({size: {x: 1, y: 1, z: 1}});

        var chunkGrid = cubed.grid.generate(grid, {x: 16, y: 16, z: 16}, 1);

        expect(cubed.grid.getSize(chunkGrid)).toEqual({x: 1, y: 1, z: 1});
      });

      it('creates multiple chunks for large grids', function() {
        var grid = cubed.grid.create({size: {x: 1, y: 1, z: 32}});

        var chunkMeshes = cubed.grid.generate(grid, {x: 16, y: 16, z: 16}, 1);

        expect(cubed.grid.getSize(chunkMeshes)).toEqual({x: 1, y: 1, z: 2});
      });

      xit('accepts voxel types to use for generation', function() {
        var voxels = [{position: {x: 0, y: 0, z: 0}, voxel: {}}];
        var grid = cubed.grid.create({size: {x: 1, y: 1, z: 1}, values: voxels});
        var voxelType = new cubed.VoxelType('test type');
        var voxelTypes = [voxelType];

        cubed.grid.generate(grid, {x: 16, y: 16, z: 16}, 1, voxelTypes);

        //expect(cubedObject.chunks.voxelTypes.length).toEqual(1);
        //expect(cubedObject.chunks.voxelTypes[0]).toEqual(voxelType);
      });

    });

    describe('iteration', function() {
      it('loops over all locations in a grid', function() {
        var grid = cubed.grid.create({size: {x: 1, y: 2, z: 3}});

        var cells = [];

        var iterator = cubed.grid.getIterator(grid);
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
      var grid = cubed.grid.create({size: {x: 1, y: 2, z: 3}});

      var cells = [];

      var iterator = cubed.grid.getIterator(grid);
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
          {position: {x: 0, y: 0, z: 0}, voxel: {foo: 'bar'}}
        , {position: {x: 0, y: 1, z: 0}, voxel: {bazz: 'qux'}}
        , {position: {x: 0, y: 1, z: 1}, voxel: {quxx: 'quxxx'}}
      ];
      var grid = cubed.grid.create({size: {x: 1, y: 2, z: 2}, values: voxels});

      var cells = [];

      var iterator = cubed.grid.getIterator(grid);
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
        var grid = cubed.grid.create({size: {x: 1, y: 2, z: 3}});
        expect(grid).toEqual([ [ [null] ] ] );
      });

      it('always has a list of voxel types even if none were provided', function() {
        var grid = new cubed.GRID({x: 2, y: 2, z: 2});
        expect(grid.voxelTypes).toEqual([]);
      });

      it('accepts a list of voxel types', function() {
        var voxelTypes = [
            new cubed.VoxelType('foo')
          , new cubed.VoxelType('bar')
          , new cubed.VoxelType('bazz')
        ];
        var grid = new cubed.GRID({x: 2, y: 2, z: 2}, voxelTypes);

        expect(grid.voxelTypes[0].name).toContain('foo');
        expect(grid.voxelTypes[1].name).toContain('bar');
        expect(grid.voxelTypes[2].name).toContain('bazz');
      });
    });
    */
  });
}(cubed));

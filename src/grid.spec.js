'use strict';

(function(cubed) {
  describe('GRID', function() {
    it('can set and get a voxel at a position', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(3, 3, 3));
      grid.set(new cubed.VECTOR(1, 1, 1), {});
      expect(grid.get(new cubed.VECTOR(1, 1, 1))).not.toBeNull();
    });

    it('returns falsy when getting a voxel at an empty position', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(3, 3, 3));
      expect(grid.get(new cubed.VECTOR(1, 1, 1))).toBeFalsy();
    });

    it('retains its size', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(4, 4, 4));
      expect(grid.size).toEqual(new cubed.VECTOR(4, 4, 4));
    });

    it('can be created with a vector', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(3, 3, 3));
      expect(grid.size).toEqual(new cubed.VECTOR(3, 3, 3));
    });

    it('gives a descriptive error when trying to add voxels that are out of bounds', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(1, 1, 1));
      expect(function() {
        grid.set(new cubed.VECTOR(1, 1, 1), new cubed.VOXEL());
      }).toThrowError('Position {x: 1, y: 1, z: 1} is out of grid bounds {x: 1, y: 1, z: 1}');
    });

    describe('texture atlas', function() {
      it('doesn\'t require a voxel atlas', function() {
        expect(function() {
          new cubed.GRID(new cubed.VECTOR(2, 2, 2));
        }).not.toThrow();
      });

      it('always has a list of voxel types even if none were provided', function() {
          var grid = new cubed.GRID(new cubed.VECTOR(2, 2, 2));
          expect(grid.voxelTypes).toEqual([]);
      });

      it('accepts a list of voxel types', function() {
        var voxelTypes = [
            new cubed.VoxelType('foo')
          , new cubed.VoxelType('bar')
          , new cubed.VoxelType('bazz')
        ];
        var grid = new cubed.GRID(new cubed.VECTOR(2, 2, 2), voxelTypes);

        expect(grid.voxelTypes[0].name).toContain('foo');
        expect(grid.voxelTypes[1].name).toContain('bar');
        expect(grid.voxelTypes[2].name).toContain('bazz');
      });
    });
  });
}(CUBED));

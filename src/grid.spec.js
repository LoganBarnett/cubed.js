'use strict';

(function(cubed) {
  describe('GRID', function() {
    it('can set and get a voxel at a position', function() {
      var grid = new cubed.GRID(3, 3, 3);
      grid.set(new cubed.VECTOR(1, 1, 1), {});
      expect(grid.get(new cubed.VECTOR(1, 1, 1))).not.toBeNull();
    });

    it('returns falsy when getting a voxel at an empty position', function() {
      var grid = new cubed.GRID(3, 3, 3);
      expect(grid.get(new cubed.VECTOR(1, 1, 1))).toBeFalsy();
    });
  });
}(CUBED));

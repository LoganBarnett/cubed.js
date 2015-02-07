'use strict';

(function(cubed) {

  var fillGrid = function(grid, fromX, fromY, fromZ, toX, toY, toZ) {
    for(var x = fromX; x < toX; ++x) {
      for(var y = fromY; y < toY; ++y) {
        for(var z = fromZ; z < toZ; ++z) {
          grid.set(new cubed.VECTOR(x, y, z), new cubed.VOXEL());
        }
      }
    }
  };

  describe('chunk', function() {

    it('generates a render mesh from its voxels', function() {
      var chunk = new cubed.CHUNK();
      var grid = new cubed.GRID(new cubed.VECTOR(1, 1, 2));
      grid.set(new cubed.VECTOR(0, 0, 0), new cubed.VOXEL());
      grid.set(new cubed.VECTOR(0, 0, 1), new cubed.VOXEL());

      var meshData = chunk.generate(grid, new cubed.VECTOR(1, 1, 2), new cubed.VECTOR(0, 0, 0), 1);

      expect(meshData.vertexes.length).toEqual(((6 * 4) - 4) * 2); // 20 verts when one side is missing, x2 for two voxels
    });

    it('generates a render mesh when there is voxel data missing from grid locations', function() {
      var chunk = new cubed.CHUNK();
      var grid = new cubed.GRID(new cubed.VECTOR(1, 1, 2));
      grid.set(new cubed.VECTOR(0, 0, 0), new cubed.VOXEL());

      var meshData = chunk.generate(grid, new cubed.VECTOR(1, 1, 2), new cubed.VECTOR(0, 0, 0));

      expect(meshData.vertexes.length).toEqual(4 * 6);
    });

    it('generates a render mesh from a fixed size of of the total grid', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(32, 32, 32));
      var chunk = new cubed.CHUNK();

      fillGrid(grid, 0, 0, 0, 32, 32, 32);

      var meshData = chunk.generate(grid, new cubed.VECTOR(16, 16, 16), new cubed.VECTOR(0, 0, 0));

      // don't calculate as a volume, but a surface area of verts
      // 16 voxel per side, 6 sides, and 4 verts per voxel, but half of that since we're only taking 3 sides (the remaining voxel is filled)
      expect(meshData.vertexes.length).toBe(16 * 16 * 6 * 4 / 2);
    });

    it('generates a render mesh from a fixed size of the total grid with a chunk offset', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(32, 32, 32));
      var chunk = new cubed.CHUNK();

      fillGrid(grid, 0, 0, 0, 32, 32, 32);

      var meshData = chunk.generate(grid, new cubed.VECTOR(16, 16, 16), new cubed.VECTOR(1, 1, 1), 1);

      // don't calculate as a volume, but a surface area of verts
      // 16 voxels per side, 6 sides, and 4 verts per voxel, but half of that since we're only taking 3 sides (the remaining voxel is filled)
      expect(meshData.vertexes.length).toBe(16 * 16 * 6 * 4 / 2);
      // first vert will be 1, 0, 0 relative to the chunk
      // z at max of the chunk size because the grid is full of voxels, so the first voxel we draw is at the edge.
      // TODO: we should probably split tests up to capture this behavior and simpler behavior as well.
      expect(meshData.vertexes[0]).toEqual(new cubed.VECTOR(17, 16, 32));
    });

    it('builds up a list of triangles as part of its mesh data', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(1, 1, 1));
      var chunk = new cubed.CHUNK();

      fillGrid(grid, 0, 0, 0, 1, 1, 1);

      var meshData = chunk.generate(grid, new cubed.VECTOR(1, 1, 1), new cubed.VECTOR(0, 0, 0), 1);

      expect(meshData.triangles).toBeDefined();
      expect(meshData.triangles.length).toEqual(6 * 2);
    });

    it('builds up a list of uvs as part of its mesh data', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(1, 1, 1));
      var chunk = new cubed.CHUNK();

      fillGrid(grid, 0, 0, 0, 1, 1, 1);

      var meshData = chunk.generate(grid, new cubed.VECTOR(1, 1, 1), new cubed.VECTOR(0, 0, 0), 1);

      expect(meshData.uvs).toBeDefined();
      expect(meshData.uvs.length).toEqual(12);
    });

  }); // describe chunk
}(CUBED)); // define

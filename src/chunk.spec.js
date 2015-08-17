'use strict';

(function(cubed) {

  var filledVoxelRange = function(fromX, fromY, fromZ, toX, toY, toZ) {
    var voxels = [];
    for(var x = fromX; x < toX; ++x) {
      for(var y = fromY; y < toY; ++y) {
        for(var z = fromZ; z < toZ; ++z) {
          voxels.push({position: {x: x, y: y, z: z}, voxel: {}});
        }
      }
    }
    return voxels;
  };

  describe('chunk', function() {
    it('generates a render mesh from its voxels', function() {
      var voxels = [
          {position: {x: 0, y: 0, z: 0}, voxel: {}}
        , {position: {x: 0, y: 0, z: 1}, voxel: {}}
      ];
      var grid = new cubed.grid.create({size: {x: 1, y: 1, z: 2}, values: voxels});

      var meshData = cubed.chunk.generate(grid, {x: 1, y: 1, z: 2}, {x: 0, y: 0, z: 0}, 1);

      expect(meshData.vertexes.length).toEqual(((6 * 4) - 4) * 2); // 20 verts when one side is missing, x2 for two voxels
    });

    it('generates a render mesh when there is voxel data missing from grid locations', function() {
      var voxels = [{position: {x: 0, y: 0, z: 0}, voxel: {}}];
      var grid = cubed.grid.create({size: {x: 1, y: 1, z: 2}, values: voxels});

      var meshData = cubed.chunk.generate(grid, {x: 1, y: 1, z: 2}, {x: 0, y: 0, z: 0});

      expect(meshData.vertexes.length).toEqual(4 * 6);
    });

    it('generates a render mesh from a fixed size of of the total grid', function() {
      var voxels = filledVoxelRange(0, 0, 0, 32, 32, 32);
      var grid = cubed.grid.create({size: {x: 32, y: 32, z: 32}, values: voxels});

      var meshData = cubed.chunk.generate(grid, {x: 16, y: 16, z: 16}, {x: 0, y: 0, z: 0});

      // don't calculate as a volume, but a surface area of verts
      // 16 voxel per side, 6 sides, and 4 verts per voxel, but half of that since we're only taking 3 sides (the remaining voxel is filled)
      expect(meshData.vertexes.length).toBe(16 * 16 * 6 * 4 / 2);
    });

    it('generates a render mesh from a fixed size of the total grid with a chunk offset', function() {
      var voxels = filledVoxelRange(0, 0, 0, 32, 32, 32);
      var grid = cubed.grid.create({size: {x: 32, y: 32, z: 32}, values: voxels});

      var meshData = cubed.chunk.generate(grid, {x: 16, y: 16, z: 16}, {x: 1, y: 1, z: 1}, 1);

      // don't calculate as a volume, but a surface area of verts
      // 16 voxels per side, 6 sides, and 4 verts per voxel, but half of that since we're only taking 3 sides (the remaining voxel is filled)
      expect(meshData.vertexes.length).toBe(16 * 16 * 6 * 4 / 2);
      // first vert will be 1, 0, 0 relative to the chunk
      // z at max of the chunk size because the grid is full of voxels, so the first voxel we draw is at the edge.
      // TODO: we should probably split tests up to capture this behavior and simpler behavior as well.
      expect(meshData.vertexes[0]).toEqual({x: 17, y: 16, z: 32});
    });

    it('builds up a list of triangles as part of its mesh data', function() {
      var voxels = filledVoxelRange(0, 0, 0, 1, 1, 1);
      var grid = cubed.grid.create({size: {x: 1, y: 1, z: 1}, values: voxels});

      var meshData = cubed.chunk.generate(grid, {x: 1, y: 1, z: 1}, {x: 0, y: 0, z: 0}, 1);

      expect(meshData.triangles).toBeDefined();
      expect(meshData.triangles.length).toEqual(6 * 2);
    });

    it('builds up a list of uvs as part of its mesh data', function() {
      var voxels = filledVoxelRange(0, 0, 0, 1, 1, 1);
      var grid = new cubed.grid.create({size: {x: 1, y: 1, z: 1}, values: voxels});

      var meshData = cubed.chunk.generate(grid, {x: 1, y: 1, z: 1}, {x: 0, y: 0, z: 0}, 1);

      expect(meshData.uvs).toBeDefined();
      expect(meshData.uvs.length).toEqual(12);
    });

  }); // describe chunk
}(cubed)); // define

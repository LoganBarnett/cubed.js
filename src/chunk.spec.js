'use strict';

(function() {
  var chunk = CUBED.CHUNK;

  var createGrid = function(xSize, ySize, zSize) {
    var grid = Array(xSize);
    for(var x = 0; x < xSize; ++x) {
      grid[x] = Array(ySize);
      for(var y = 0; y < ySize; ++y) {
        grid[x][y] = Array(zSize);
      }
    }

    return grid;
  };

  var fillGrid = function(grid, fromX, fromY, fromZ, toX, toY, toZ) {
    for(var x = fromX; x < toX; ++x) {
      for(var y = fromY; y < toY; ++y) {
        for(var z = fromZ; z < toZ; ++z) {
          grid[x][y][z] = {};
        }
      }
    }
  };

  describe('chunk', function() {

    it('generates a render mesh from its voxels', function() {
      var grid = [
        [
          [{}, {}]
        ]
      ];

      var meshData = chunk.generate(grid, {x: 1, y: 1, z: 2}, {x: 0, y: 0, z: 0});

      expect(meshData.renderMesh.length).toEqual(((6 * 4) - 4) * 2); // 20 verts when one side is missing, x2 for two voxels
    });

    it('generates a render mesh when there is voxel data missing from grid locations', function() {
      var grid = [
        [
          [{}, null]
        ]
      ];

      var meshData = chunk.generate(grid, {x: 1, y: 1, z: 2}, {x: 0, y: 0, z: 0});

      expect(meshData.renderMesh.length).toEqual(4 * 6);
    });

    it('generates a render mesh from a fixed size of of the total grid', function() {
      var grid = createGrid(32, 32, 32);

      fillGrid(grid, 0, 0, 0, 32, 32, 32);

      var meshData = chunk.generate(grid, {x: 16, y: 16, z: 16}, {x: 0, y: 0, z: 0});

      // don't calculate as a volume, but a surface area of verts
      // 16 voxel per side, 6 sides, and 4 verts per voxel, but half of that since we're only taking 3 sides (the remaining voxel is filled)
      expect(meshData.renderMesh.length).toBe(16 * 16 * 6 * 4 / 2);
    });

    it('generates a render mesh from a fixed size of the total grid with a chunk offset', function() {
      var grid = createGrid(32, 32, 32);

      fillGrid(grid, 0, 0, 0, 32, 32, 32);

      var meshData = chunk.generate(grid, {x: 16, y: 16, z: 16}, {x: 1, y: 1, z: 1}, 1);

      // don't calculate as a volume, but a surface area of verts
      // 16 voxels per side, 6 sides, and 4 verts per voxel, but half of that since we're only taking 3 sides (the remaining voxel is filled)
      expect(meshData.renderMesh.length).toBe(16 * 16 * 6 * 4 / 2);
      // first vert will be 1, 0, 0 relative to the chunk
      // z at max of the chunk size because the grid is full of voxels, so the first voxel we draw is at the edge.
      // TODO: we should probably split tests up to capture this behavior and simpler behavior as well.
      expect(meshData.renderMesh[0]).toEqual({x: 17, y: 16, z: 32});
    });

    it('builds up a list of triangles as part of its mesh data', function() {
      var grid = createGrid(1, 1, 1);

      fillGrid(grid, 0, 0, 0, 1, 1, 1);

      var meshData = chunk.generate(grid, {x: 1, y: 1, z: 1}, {x: 0, y: 0, z: 0}, 1);

      expect(meshData.triangles).toBeDefined();
      expect(meshData.triangles.length).toEqual(6 * 2);
    });

  }); // describe chunk
}(CUBED)); // define
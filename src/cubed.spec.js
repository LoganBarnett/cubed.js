'use strict';

(function(cubed) {
  describe('cubed', function() {
    it('creates a chunk for a small grid', function() {
      var grid = [
        [
          [{}]
        ]
      ];

      var cubedObject = cubed.create();

      var cubedMeshData = cubedObject.generate(grid, {x: 16, y: 16, z: 16}, 1);

      expect(cubedObject.chunks.length).toBe(1);
      expect(cubedObject.chunks[0].length).toBe(1);
      expect(cubedObject.chunks[0][0].length).toBe(1);

      //expect(cubedMeshData).not.toBeUndefined();
      //expect(cubedMeshData).not.toBeNull();
      //expect(cubedMeshData.renderMesh).not.toBeUndefined();
      //expect(cubedMeshData.renderMesh).not.toBeNull();
      //
      //expect(cubedMeshData.renderMesh.length).toBe(6 * 4);
      //expect(cubedMeshData.renderMesh[0]).toEqual({x: 1, y: 0, z: 0});
    });

    it('creates multiple chunks for large grids', function() {
      var grid = [
        [
          Array(32)
        ]
      ];

      var cubedObject = cubed.create();
      cubedObject.generate(grid, {x: 16, y: 16, z: 16}, 1);

      expect(cubedObject.chunks.length).toBe(1);
      expect(cubedObject.chunks[0].length).toBe(1);
      expect(cubedObject.chunks[0][0].length).toBe(2);
    });

    it('can add voxels and regenerate the chunk meshes', function() {
      var grid = [
        [
          [{}, null]
        ]
      ];

      var cubedObject = cubed.create();

      cubedObject.generate(grid, {x: 16, y: 16, z: 16}, 1);

      expect(cubedObject.chunks[0][0][0].renderMesh.length).toBe(24);

      grid[0][0][1] = {};
      cubedObject.generate(grid, {x: 16, y: 16, z: 16}, 1);
      expect(cubedObject.chunks[0][0][0].renderMesh.length).toBe(40);
    });

    it('can remove voxels and regenerate the chunk meshes', function() {
      var grid = [
        [
          [{}, {}]
        ]
      ];

      var cubedObject = cubed.create();
      cubedObject.generate(grid, {x: 16, y: 16, z: 16}, 1);

      expect(cubedObject.chunks[0][0][0].renderMesh.length).toBe(40);

      grid[0][0][1] = null;
      cubedObject.generate(grid, {x: 16, y: 16, z: 16}, 1);
      expect(cubedObject.chunks[0][0][0].renderMesh.length).toBe(24);
    });

  });
}(CUBED));
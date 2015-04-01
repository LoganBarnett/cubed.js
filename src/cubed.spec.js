'use strict';

(function(cubed) {
  describe('cubed', function() {
    it('creates a chunk for a small grid', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(1, 1, 1));

      var cubedObject = new cubed();

      cubedObject.generate(grid, new cubed.VECTOR(16, 16, 16), 1);

      expect(cubedObject.chunks.size).toEqual(new cubed.VECTOR(1, 1, 1));

      //expect(cubedMeshData).not.toBeUndefined();
      //expect(cubedMeshData).not.toBeNull();
      //expect(cubedMeshData.mesh.vertexes).not.toBeUndefined();
      //expect(cubedMeshData.mesh.vertexes).not.toBeNull();
      //
      //expect(cubedMeshData.mesh.vertexes.length).toBe(6 * 4);
      //expect(cubedMeshData.mesh.vertexes[0]).toEqual(new cubed.VECTOR(1, 0, 0));
    });

    it('creates multiple chunks for large grids', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(1, 1, 32));

      var cubedObject = new cubed();
      cubedObject.generate(grid, new cubed.VECTOR(16, 16, 16), 1);

      expect(cubedObject.chunks.size).toEqual(new cubed.VECTOR(1, 1, 2));
    });

    it('can add voxels and regenerate the chunk meshes', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(1, 1, 2));
      grid.set(new cubed.VECTOR(0, 0, 0), new cubed.VOXEL());

      var cubedObject = new cubed();

      cubedObject.generate(grid, new cubed.VECTOR(16, 16, 16), 1);
      var chunk = cubedObject.chunks.get(new cubed.VECTOR(0, 0, 0));
      expect(chunk.mesh.vertexes.length).toBe(24);

      grid.set(new cubed.VECTOR(0, 0, 1), new cubed.VOXEL());
      cubedObject.generate(grid, new cubed.VECTOR(16, 16, 16), 1);
      expect(cubedObject.chunks.get(new cubed.VECTOR(0, 0, 0)).mesh.vertexes.length).toBe(40);
    });

    it('can remove voxels and regenerate the chunk meshes', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(1, 1, 2));
      grid.set(new cubed.VECTOR(0, 0, 0), new cubed.VOXEL());
      grid.set(new cubed.VECTOR(0, 0, 1), new cubed.VOXEL());

      var cubedObject = new cubed();
      cubedObject.generate(grid, new cubed.VECTOR(16, 16, 16), 1);
      var chunk = cubedObject.chunks.get(new cubed.VECTOR(0, 0, 0));
      expect(chunk.mesh.vertexes.length).toBe(40);

      grid.set(new cubed.VECTOR(0, 0, 1), null);
      cubedObject.generate(grid, new cubed.VECTOR(16, 16, 16), 1);
      chunk = cubedObject.chunks.get(new cubed.VECTOR(0, 0, 0));
      expect(chunk.mesh.vertexes.length).toBe(24);
    });

    it('accepts voxel types to use for generation', function() {
      var grid = new cubed.GRID(new cubed.VECTOR(1, 1, 1));
      var cubedObject = new cubed();
      var voxelType = new cubed.VoxelType('test type');
      var voxelTypes = [voxelType];

      grid.set(new cubed.VECTOR(0, 0, 0), new cubed.VOXEL(voxelType));

      cubedObject.generate(grid, new cubed.VECTOR(16, 16, 16), 1, voxelTypes);

      expect(cubedObject.chunks.voxelTypes.length).toEqual(1);
      expect(cubedObject.chunks.voxelTypes[0]).toEqual(voxelType);
    });

  });
}(CUBED));

'use strict';

CUBED = (function(cubed) {
  var chunk = cubed.CHUNK = cubed.CHUNK || {};

  chunk.generate = function(grid, chunkSize, chunkOffset, voxelSize) {
    var chunkMeshData = {
        renderMesh: []
      , triangles: []
      , uvs: []
    };

    var vertexCount = 0;

    for(var x = 0; x < chunkSize.x; ++x) {
      for(var y = 0; y < chunkSize.y; ++y) {
        for(var z = 0; z < chunkSize.z; ++z) {
          var coords = {x: x + (chunkOffset.x * chunkSize.x), y: y + (chunkOffset.y * chunkSize.y), z: z + (chunkOffset.z * chunkSize.z)};
          if(grid[coords.x] == null) continue;
          if(grid[coords.x][coords.y] == null) continue;
          if(grid[coords.x][coords.y][coords.z] == null) continue;
          var voxelData = grid[coords.x][coords.y][coords.z];
          if(voxelData == null) continue;
          var voxelMeshData = cubed.VOXEL.generate(grid, coords, voxelSize, vertexCount);
          vertexCount = voxelMeshData.vertexCount;
          chunkMeshData.renderMesh = chunkMeshData.renderMesh.concat(voxelMeshData.renderMesh);

          chunkMeshData.triangles = chunkMeshData.triangles.concat(voxelMeshData.triangles);

          chunkMeshData.uvs = chunkMeshData.uvs.concat(voxelMeshData.uvs)
        }
      }
    }

    return chunkMeshData;
  };

  return cubed;
}(CUBED));
'use strict';

const voxel = require('./voxel');
const chunk = {};

chunk.generate = function(g, getterFn, chunkSize, chunkOffset, voxelSize) {

  var chunkMeshData = {
      vertexes: []
    , triangles: []
    , uvs: []
  };
  var vertexCount = 0;

  for(var x = 0; x < chunkSize.x; ++x) {
    for(var y = 0; y < chunkSize.y; ++y) {
      for(var z = 0; z < chunkSize.z; ++z) {
        var coords = {
            x: x + (chunkOffset.x * chunkSize.x)
          , y: y + (chunkOffset.y * chunkSize.y)
          , z: z + (chunkOffset.z * chunkSize.z)
        };
        // var voxel = cubed.grid.get(grid, coords);

        var voxelMeshData = voxel.generate(g, getterFn, coords, voxelSize, vertexCount);
        vertexCount = voxelMeshData.vertexCount;
        chunkMeshData.vertexes = chunkMeshData.vertexes.concat(voxelMeshData.renderMesh);

        chunkMeshData.triangles = chunkMeshData.triangles.concat(voxelMeshData.triangles);

        chunkMeshData.uvs = chunkMeshData.uvs.concat(voxelMeshData.uvs)
      }
    }
  }

  return chunkMeshData;
};

module.exports = chunk;

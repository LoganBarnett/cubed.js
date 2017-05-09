'use strict';

const voxel = require('./voxel');
const chunk = {};

chunk.generate = (
  matIndex,
  emptyCell,
  g,
  getterFn,
  chunkSize,
  chunkOffset,
  voxelSize
) => {

  var chunkMeshData = {
    vertexes: [],
    triangles: [],
    uvs: [],
    materialIndexes: [],
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

        const voxelMeshData = voxel.generate(
          matIndex,
          emptyCell,
          g,
          getterFn,
          coords,
          voxelSize,
          vertexCount
        )
        // TODO: Build up a material index list here. Maybe have the index apply
        // as a list of numbers, with the expectation that it corresponds with
        // the triads of triangle indexes (triangles).
        vertexCount = voxelMeshData.vertexCount;
        chunkMeshData.materialIndexes = chunkMeshData.materialIndexes
          .concat(voxelMeshData.materialIndexes)
        chunkMeshData.vertexes = chunkMeshData.vertexes.concat(voxelMeshData.renderMesh);

        chunkMeshData.triangles = chunkMeshData.triangles.concat(voxelMeshData.triangles);

        chunkMeshData.uvs = chunkMeshData.uvs.concat(voxelMeshData.uvs)
      }
    }
  }

  return chunkMeshData;
};

module.exports = chunk;

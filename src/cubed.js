'use strict';

define(['chunk', 'voxel'], function(chunk, voxel) {

  var chunks = [];
  var generate = function(grid, chunkSize, voxelSize) {
    var chunkXLength = parseInt(grid.length / chunkSize.x); // TODO: this math is wrong. Fenceposting
    var chunkYLength = parseInt(grid[0].length / chunkSize.y);
    var chunkZLength = parseInt(grid[0][0].length / chunkSize.z);

    if(grid.length % chunkSize.x != 0) ++chunkXLength;
    if(grid[0].length % chunkSize.y != 0) ++chunkYLength;
    if(grid[0][0].length % chunkSize.z != 0) ++chunkZLength;

    for(var x = 0; x < chunkXLength; ++x) {
      for(var y = 0; y < chunkYLength; ++y) {
        for(var z = 0; z < chunkZLength; ++z) {
          var chunkMeshData = chunk.generate(grid, chunkSize, {x: x, y: y, z: z}, voxelSize);
          if(chunks[x] == null) chunks[x] = [];
          if(chunks[x][y] == null) chunks[x][y] = [];
          if(chunks[x][y][z] == null) chunks[x][y][z] = [];
          chunks[x][y][z] = chunkMeshData;
        }
      }
    }

    return {renderMesh: Array(6 * 4)};
  };

  return {
      generate: generate
    , chunks: chunks
  };
});
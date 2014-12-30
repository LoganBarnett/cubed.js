'use strict';

var CUBED = (function() {

  var cubed = {};
  cubed.create = function() {
    var cubedObject = {};

    cubedObject.chunks = [];
    cubedObject.generate = function (grid, chunkSize, voxelSize) {
      var chunkXLength = parseInt(grid.length / chunkSize.x);
      var chunkYLength = parseInt(grid[0].length / chunkSize.y);
      var chunkZLength = parseInt(grid[0][0].length / chunkSize.z);

      if (grid.length % chunkSize.x != 0) ++chunkXLength;
      if (grid[0].length % chunkSize.y != 0) ++chunkYLength;
      if (grid[0][0].length % chunkSize.z != 0) ++chunkZLength;

      for (var x = 0; x < chunkXLength; ++x) {
        for (var y = 0; y < chunkYLength; ++y) {
          for (var z = 0; z < chunkZLength; ++z) {
            var chunkMeshData = cubed.CHUNK.generate(grid, chunkSize, {x: x, y: y, z: z}, voxelSize);
            if (cubedObject.chunks[x] == null) cubedObject.chunks[x] = [];
            if (cubedObject.chunks[x][y] == null) cubedObject.chunks[x][y] = [];
            if (cubedObject.chunks[x][y][z] == null) cubedObject.chunks[x][y][z] = [];
            cubedObject.chunks[x][y][z] = chunkMeshData;
          }
        }
      }
    };
    return cubedObject;
  };
  return cubed;
}());
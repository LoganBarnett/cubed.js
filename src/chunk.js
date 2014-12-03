'use strict';

define(['cube'], function(cube) {

  var generate = function(grid, chunkSize, chunkOffset) {
    var chunkMeshData = {
      renderMesh: []
    };

    for(var x = 0; x < chunkSize.x; ++x) {
      for(var y = 0; y < chunkSize.y; ++y) {
        for(var z = 0; z < chunkSize.z; ++z) {
          var coords = {x: x + (chunkOffset.x * chunkSize.x), y: y + (chunkOffset.y * chunkSize.y), z: z + (chunkOffset.z * chunkSize.z)};
          var cubeData = grid[coords.x][coords.y][coords.z];
          if(cubeData == null) continue;
          var cubeMeshData = cube.generate(grid, coords);
          chunkMeshData.renderMesh = chunkMeshData.renderMesh.concat(cubeMeshData.renderMesh);
        }
      }
    }

    return chunkMeshData;
  };

  return {
    generate: generate
  };
});
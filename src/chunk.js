'use strict';

define(['cube'], function(cube) {

  var generate = function(grid) {
    var chunkMeshData = {
      renderMesh: []
    };

    for(var x = 0; x < grid.length; ++x) {
      for(var y = 0; y < grid[x].length; ++y) {
        for(var z = 0; z < grid[x][y].length; ++z) {
          var cubeData = grid[x][y][z];
          if(cubeData == null) continue;
          var coords = {x: x, y: y, z: z};
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
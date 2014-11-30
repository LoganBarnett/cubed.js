'use strict';

define(['lodash'], function(_) {

  var sidedMeshes = {
    down: [
      {x: 1, y: 0, z: 0},
      {x: 1, y: 0, z: 1},
      {x: 0, y: 0, z: 0},
      {x: 0, y: 0, z: 1}
    ],
    up: [
      {x: 0, y: 1, z: 0},
      {x: 0, y: 1, z: 1},
      {x: 1, y: 1, z: 0},
      {x: 1, y: 1, z: 1}
    ],
    right: [
      {x: 1, y: 0, z: 0},
      {x: 1, y: 1, z: 0},
      {x: 1, y: 0, z: 1},
      {x: 1, y: 1, z: 1}
    ],
    left: [
      {x: 0, y: 0, z: 1},
      {x: 1, y: 1, z: 1},
      {x: 0, y: 0, z: 0},
      {x: 0, y: 1, z: 0}
    ],
    front: [
      {x: 1, y: 0, z: 1},
      {x: 1, y: 1, z: 1},
      {x: 0, y: 0, z: 1},
      {x: 0, y: 1, z: 1}
    ],
    back: [
      {x: 0, y: 0, z: 0},
      {x: 0, y: 1, z: 0},
      {x: 1, y: 0, z: 0},
      {x: 1, y: 1, z: 0}
    ]
  };

  var generate = function(grid, coords, cubeSize) {
    var meshData = {renderMesh: []};

    var neighbors = {};
    neighbors.down  = grid[coords.x][ coords.y - 1][coords.z];
    neighbors.up    = grid[coords.x][coords.y + 1][coords.z];
    neighbors.right = grid[coords.x + 1][coords.y][coords.z];
    neighbors.left  = grid[coords.x - 1][coords.y][coords.z];
    neighbors.front = grid[coords.x][coords.y][coords.z + 1];
    neighbors.back  = grid[coords.x][coords.y][coords.z - 1];

    var sideNames = ['down', 'up', 'right', 'left', 'front', 'back'];

    //var cube = grid[coords.x][coords.y][coords.z];

    sideNames.forEach(function(sideName) {
      var side = neighbors[sideName];
      if(side == null) {
        var sideVertexes = _.map(sidedMeshes[sideName], function(vertex) {
          var result = {x: vertex.x + coords.x, y: vertex.y + coords.y, z: vertex.z + coords.z};
          return result;
        });

        meshData.renderMesh = meshData.renderMesh.concat(sideVertexes);
      }
    });

    return meshData;
  };

  return {
    generate: generate
  };
});
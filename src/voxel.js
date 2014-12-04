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

  var getVoxelData = function(grid, coords) {
    var yzGrid = grid[coords.x];
    if(!yzGrid) return null;
    var zGrid = yzGrid[coords.y];
    if(!zGrid) return null;
    return zGrid[coords.z];
  };

  var generate = function(grid, coords, voxelSize) {
    var meshData = {renderMesh: []};

    var neighbors = {};
    neighbors.down  = getVoxelData(grid, {x: coords.x, y: coords.y - 1, z: coords.z});
    neighbors.up    = getVoxelData(grid, {x: coords.x, y: coords.y + 1, z: coords.z});
    neighbors.right = getVoxelData(grid, {x: coords.x + 1, y: coords.y, z: coords.z});
    neighbors.left  = getVoxelData(grid, {x: coords.x - 1, y: coords.y, z: coords.z});
    neighbors.front = getVoxelData(grid, {x: coords.x, y: coords.y, z: coords.z + 1});
    neighbors.back  = getVoxelData(grid, {x: coords.x, y: coords.y, z: coords.z - 1});

    var sideNames = ['down', 'up', 'right', 'left', 'front', 'back'];

    //var voxel = grid[coords.x][coords.y][coords.z];

    sideNames.forEach(function(sideName) {
      var side = neighbors[sideName];
      if(side == null) {
        var sideVertexes = _.map(sidedMeshes[sideName], function(vertex) {
          var result = {x: (vertex.x + coords.x) * voxelSize, y: (vertex.y + coords.y) * voxelSize, z: (vertex.z + coords.z) * voxelSize};
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
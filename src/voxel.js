'use strict';

var cubed = (function(cubed, _) {

  var voxel = cubed.voxel = {};

  voxel.FIRST_TRIANGLES  = [0, 1, 2];
  voxel.SECOND_TRIANGLES = [1, 3, 2];

  voxel.sidedMeshes = {
    bottom: [
      {x: 1, y: 0, z: 0},
      {x: 1, y: 0, z: 1},
      {x: 0, y: 0, z: 0},
      {x: 0, y: 0, z: 1}
    ],
    top: [
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
      {x: 0, y: 1, z: 1},
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

  voxel.generate = function(grid, coords, voxelSize, vertexCount) {
    var meshData = {renderMesh: [], triangles: [], uvs: [], vertexCount: vertexCount};

    var sideNames = ['bottom', 'top', 'right', 'left', 'front', 'back'];

    // TODO: Reduce candidate?
    sideNames.forEach(function(sideName) {
      var sideCoords = cubed.vector[sideName](coords);
      if(!cubed.grid.get(grid, sideCoords)) {
        var sideVertexes = _.map(voxel.sidedMeshes[sideName], function(vertex) {
          var result = {x: (vertex.x + coords.x) * voxelSize, y: (vertex.y + coords.y) * voxelSize, z: (vertex.z + coords.z) * voxelSize};
          return result;
        });

        meshData.renderMesh = meshData.renderMesh.concat(sideVertexes);
        meshData.triangles.push(_.map(voxel.FIRST_TRIANGLES,  function(t) { return t + meshData.vertexCount; }));
        meshData.triangles.push(_.map(voxel.SECOND_TRIANGLES, function(t) { return t + meshData.vertexCount; }));
        meshData.vertexCount += 4;

        meshData.uvs.push([{u: 0, v: 0}, {u: 1, v: 0}, {u: 0, v: 1}, {u: 1, v: 1}]);
        meshData.uvs.push([{u: 0, v: 0}, {u: 0, v: 1}, {u: 1, v: 0}, {u: 1, v: 1}]);
      }
    });

    return meshData;
  };

  cubed.reportSubmoduleReady('vector');

  return cubed;
}(cubed, _));

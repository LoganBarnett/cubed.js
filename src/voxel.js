'use strict';

CUBED = (function(cubed, _) {

  var voxel = cubed.VOXEL = cubed.VOXEL || function(voxelType) {
    this.voxelType = voxelType;
  };

  var FIRST_TRIANGLES  = [0, 1, 2];
  var SECOND_TRIANGLES = [1, 3, 2];

  var sidedMeshes = {
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

  voxel.prototype.generate = function(grid, coords, voxelSize, vertexCount) {
    var meshData = {renderMesh: [], triangles: [], uvs: [], vertexCount: vertexCount};

    var sideNames = ['bottom', 'top', 'right', 'left', 'front', 'back'];

    sideNames.forEach(function(sideName) {
      var sideCoords = coords[sideName]();
      if(!grid.get(sideCoords)) {
        var sideVertexes = _.map(sidedMeshes[sideName], function(vertex) {
          var result = new cubed.VECTOR((vertex.x + coords.x) * voxelSize, (vertex.y + coords.y) * voxelSize, (vertex.z + coords.z) * voxelSize);
          return result;
        });

        meshData.renderMesh = meshData.renderMesh.concat(sideVertexes);
        meshData.triangles.push(_.map(FIRST_TRIANGLES,  function(t) { return t + meshData.vertexCount; }));
        meshData.triangles.push(_.map(SECOND_TRIANGLES, function(t) { return t + meshData.vertexCount; }));
        meshData.vertexCount += 4;

        meshData.uvs.push([{u: 0, v: 0}, {u: 1, v: 0}, {u: 0, v: 1}, {u: 1, v: 1}])
        meshData.uvs.push([{u: 0, v: 0}, {u: 0, v: 1}, {u: 1, v: 0}, {u: 1, v: 1}])
      }
    });

    return meshData;
  };

  return cubed;
}(CUBED, _));

'use strict';

CUBED = (function(cubed) {
  var chunk = cubed.CHUNK = cubed.CHUNK || function() {
  };

  chunk.prototype.generate = function(grid, chunkSize, chunkOffset, voxelSize) {
    var chunkMeshData = {
        vertexes: []
      , triangles: []
      , uvs: []
    };

    var vertexCount = 0;

    for(var x = 0; x < chunkSize.x; ++x) {
      for(var y = 0; y < chunkSize.y; ++y) {
        for(var z = 0; z < chunkSize.z; ++z) {
          var coords = new cubed.VECTOR(x + (chunkOffset.x * chunkSize.x), y + (chunkOffset.y * chunkSize.y),z + (chunkOffset.z * chunkSize.z));
          var voxelData = grid.get(coords);
          if(voxelData == null) continue;
          var voxelMeshData = voxelData.generate(grid, coords, voxelSize, vertexCount);
          vertexCount = voxelMeshData.vertexCount;
          chunkMeshData.vertexes = chunkMeshData.vertexes.concat(voxelMeshData.renderMesh);

          chunkMeshData.triangles = chunkMeshData.triangles.concat(voxelMeshData.triangles);

          chunkMeshData.uvs = chunkMeshData.uvs.concat(voxelMeshData.uvs)
        }
      }
    }

    this.mesh = chunkMeshData;
    return chunkMeshData;
  };

  return cubed;
}(CUBED));

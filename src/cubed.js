'use strict';

var CUBED = (function() {

  var cubed = function() {
  };

  cubed.prototype.generate = function (grid, chunkSize, voxelSize) {
    this.chunkSize = chunkSize;
    var chunkXLength = parseInt(grid.size.x / chunkSize.x);
    var chunkYLength = parseInt(grid.size.y / chunkSize.y);
    var chunkZLength = parseInt(grid.size.z / chunkSize.z);

    if(grid.size.x % chunkSize.x != 0) ++chunkXLength;
    if(grid.size.y % chunkSize.y != 0) ++chunkYLength;
    if(grid.size.z % chunkSize.z != 0) ++chunkZLength;

    var chunkDimensions = new cubed.VECTOR(chunkXLength, chunkYLength, chunkZLength);
    this.chunks = new cubed.GRID(chunkDimensions);

    for (var x = 0; x < chunkXLength; ++x) {
      for (var y = 0; y < chunkYLength; ++y) {
        for (var z = 0; z < chunkZLength; ++z) {
          var chunk = new cubed.CHUNK();
          var chunkMeshData = chunk.generate(grid, chunkSize, new cubed.VECTOR(x, y, z), voxelSize);
          this.chunks.set(new cubed.VECTOR(x, y, z), chunk);
        }
      }
    };
  };
  return cubed;
}());

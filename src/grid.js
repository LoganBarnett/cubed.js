'use strict';

(function(cubed) {
  var g = null;

  var grid = cubed.GRID = cubed.GRID || function(xSize, ySize, zSize) {
    g = new Array(xSize);
    for(var x = 0; x < g.length; ++x) {
      var yArray = g[x] = new Array(ySize);
      for(var y = 0; y < yArray.length; ++y) {
        var zArray = yArray[y] = new Array(zSize);
        for(var z = 0; z < zArray.length; ++z) {
          zArray[z] = null;
        }
      }
    }
  }

  grid.prototype.set = function(position, voxel) {
    g[position.x][position.y][position.z] = voxel;
  }

  grid.prototype.get = function(position) {
    return g[position.x][position.y][position.z];
  }

}(CUBED));

'use strict';

(function(cubed) {
  var grid = cubed.GRID = cubed.GRID || function(size) {
    this.size = size;
    this.g = new Array(size.x);
    for(var x = 0; x < this.g.length; ++x) {
      var yArray = this.g[x] = new Array(size.y);
      for(var y = 0; y < yArray.length; ++y) {
        var zArray = yArray[y] = new Array(size.z);
        for(var z = 0; z < zArray.length; ++z) {
          zArray[z] = null;
        }
      }
    }
  }

  grid.prototype.set = function(position, voxel) {
    var xArray = this.g[position.x];
    var yArray, result;
    if(xArray != null) {
      yArray = xArray[position.y];
    }
    if(yArray != null) {
      if(position.z < yArray.length) {
        yArray[position.z] = voxel;
      }
    }
    if(!xArray && !yArray && !position.z < this.size.z) {
      throw new Error('Position ' + position.toString() + ' is out of grid bounds ' + this.size);
    }
  }

  grid.prototype.get = function(position) {
    var yArray = this.g[position.x];
    if(yArray == null) return undefined;
    var zArray = yArray[position.y];
    if(zArray == null) return undefined;
    return zArray[position.z];
  }

}(CUBED));

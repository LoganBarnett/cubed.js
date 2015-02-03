'use strict';

(function(cubed) {

  var vector = cubed.VECTOR = cubed.VECTOR || function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  };

  vector.prototype.left = function() {
    return new cubed.VECTOR(this.x - 1, this.y, this.z);
  }
  vector.prototype.right = function() {
    return new cubed.VECTOR(this.x + 1, this.y, this.z);
  };
  vector.prototype.front = function() {
    return new cubed.VECTOR(this.x, this.y, this.z + 1);
  };
  vector.prototype.back = function() {
    return new cubed.VECTOR(this.x, this.y, this.z - 1);
  };
  vector.prototype.top = function() {
    return new cubed.VECTOR(this.x, this.y + 1, this.z);
  };
  vector.prototype.bottom = function() {
    return new cubed.VECTOR(this.x, this.y - 1, this.z);
  };

}(CUBED));

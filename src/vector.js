'use strict';

(function(cubed) {

  var vector = cubed.vector = {};

  vector.left = function(vector) {
    return {x: vector.x - 1, y: vector.y, z: vector.z};
  };
  vector.right = function(vector) {
    return {x: vector.x + 1, y: vector.y, z: vector.z};
  };
  vector.front = function(vector) {
    return {x: vector.x, y: vector.y, z: vector.z + 1};
  };
  vector.back = function(vector) {
    return {x: vector.x, y: vector.y, z: vector.z - 1};
  };
  vector.top = function(vector) {
    return {x: vector.x, y: vector.y + 1, z: vector.z};
  };
  vector.bottom = function(vector) {
    return {x: vector.x, y: vector.y - 1, z: vector.z};
  };

  vector.isValid = function(vector) {
    if(vector.x == null || vector.y == null || vector.z == null) {
      return false;
    }
    return true;
  };

  cubed.reportSubmoduleReady('vector');

}(cubed));

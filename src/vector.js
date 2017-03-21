'use strict';

var vector = {};

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

vector.plus = (a, b) => {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
}

vector.identity = { x: 0, y: 0, z: 0 }

module.exports = vector;

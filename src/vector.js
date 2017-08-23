// @flow

'use strict';

export type Uv = {
  u: number,
  v: number,
}

export type Vector3 = {
  x: number,
  y: number,
  z: number,
}

export type Vector2 = {
  x: number,
  y: number,
}

var vector = {};

vector.left = (vector: Vector3) => {
  return {x: vector.x - 1, y: vector.y, z: vector.z};
};
vector.right = (vector: Vector3) => {
  return {x: vector.x + 1, y: vector.y, z: vector.z};
};
vector.front = (vector: Vector3) => {
  return {x: vector.x, y: vector.y, z: vector.z + 1};
};
vector.back = (vector: Vector3) => {
  return {x: vector.x, y: vector.y, z: vector.z - 1};
};
vector.top = (vector: Vector3) => {
  return {x: vector.x, y: vector.y + 1, z: vector.z};
};
vector.bottom = (vector: Vector3) => {
  return {x: vector.x, y: vector.y - 1, z: vector.z};
};

vector.isValid = (vector: Vector3) => {
  if(vector.x == null || vector.y == null || vector.z == null) {
    return false;
  }
  return true;
};

vector.plus = (a: Vector3, b: Vector3) => {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
}

vector.identity = { x: 0, y: 0, z: 0 }

module.exports = vector;

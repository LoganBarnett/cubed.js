'use strict';

const vector = require('./vector');

const vectorEquality = function(first, second) {
  if(first == null || second == null) {
    return first == second;
  }
  if(first.x === undefined || first.y === undefined || first.z === undefined
    || second.x == undefined || second.y === undefined || second.z == undefined) {
    return undefined;
  }

  return first.x == second.x && first.y == second.y && first.z == second.z;
};

beforeEach(function() {
  jasmine.addCustomEqualityTester(vectorEquality);
});

describe('vector', function() {
  describe('validation', function() {
    it('shows valid when x, y, and z a present', function() {
      const v = {x: 1, y: 2, z: 3};
      expect(vector.isValid(v)).toBe(true);
    });

    it('detects a missing x value', function() {
      const v = {v: 1, y: 2, z: 3};
      expect(vector.isValid(v)).toBe(false);
    });

    it('detects a missing y value', function() {
      const v = {x: 1, z: 3};
      expect(vector.isValid(v)).toBe(false);
    });

    it('detects a missing z value', function() {
      const v = {x: 1, y: 2};
      expect(vector.isValid(v)).toBe(false);
    });
  });

  describe('adjacency', function() {
    it('can get its left vector', function() {
      var left = vector.left({x: 2, y: 2, z: 2});
      expect(left.x).toEqual(1);
      expect(left.y).toEqual(2);
      expect(left.z).toEqual(2);
    });

    // right
    it('can get its right vector', function() {
      var right = vector.right({x: 2, y: 2, z: 2});
      expect(right.x).toEqual(3);
      expect(right.y).toEqual(2);
      expect(right.z).toEqual(2);
    });

    // front
    it('can get its front vector', function() {
      var front = vector.front({x: 2, y: 2, z: 2});
      expect(front.x).toEqual(2);
      expect(front.y).toEqual(2);
      expect(front.z).toEqual(3);
    });

    // back
    it('can get its back vector', function() {
      var back = vector.back({x: 2, y: 2, z: 2});
      expect(back.x).toEqual(2);
      expect(back.y).toEqual(2);
      expect(back.z).toEqual(1);
    });

    // top
    it('can get its top vector', function() {
      var top = vector.top({x: 2, y: 2, z: 2});
      expect(top.x).toEqual(2);
      expect(top.y).toEqual(3);
      expect(top.z).toEqual(2);
    });

    // bottom
    it('can get its bottom vector', function() {
      var bottom = vector.bottom({x: 2, y: 2, z: 2});
      expect(bottom.x).toEqual(2);
      expect(bottom.y).toEqual(1);
      expect(bottom.z).toEqual(2);
    });
  });
});

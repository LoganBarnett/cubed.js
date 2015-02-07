'use strict';

var vectorEquality = function(first, second) {
  if(first.x === undefined || first.y === undefined || first.z === undefined
     || second.x == undefined || second.y === undefined || second.z == undefined) {
    return undefined;
  }

  return first.x == second.x && first.y == second.y && first.z == second.z;
};

beforeEach(function() {
  jasmine.addCustomEqualityTester(vectorEquality);
});

describe('CUBED.vector', function() {
  it('has x, y, and z properties', function() {
    var vector = new CUBED.VECTOR(1, 2, 3);
    expect(vector.x).toEqual(1);
    expect(vector.y).toEqual(2);
    expect(vector.z).toEqual(3);
  });

  it('has a friendly toString()', function() {
    var vector = new CUBED.VECTOR(1, 2, 3);
    expect(vector.toString()).toEqual('{x: 1, y: 2, z: 3}');
  });

  describe('adjacency', function() {
    it('can get its left vector', function() {
      var vector = new CUBED.VECTOR(2, 2, 2);
      var left = vector.left();
      expect(left.x).toEqual(1);
      expect(left.y).toEqual(2);
      expect(left.z).toEqual(2);
    });

    // right
    it('can get its right vector', function() {
      var vector = new CUBED.VECTOR(2, 2, 2);
      var right = vector.right();
      expect(right.x).toEqual(3);
      expect(right.y).toEqual(2);
      expect(right.z).toEqual(2);
    });

    // front
    it('can get its front vector', function() {
      var vector = new CUBED.VECTOR(2, 2, 2);
      var front = vector.front();
      expect(front.x).toEqual(2);
      expect(front.y).toEqual(2);
      expect(front.z).toEqual(3);
    });

    // back
    it('can get its back vector', function() {
      var vector = new CUBED.VECTOR(2, 2, 2);
      var back = vector.back();
      expect(back.x).toEqual(2);
      expect(back.y).toEqual(2);
      expect(back.z).toEqual(1);
    });

    // top
    it('can get its top vector', function() {
      var vector = new CUBED.VECTOR(2, 2, 2);
      var top = vector.top();
      expect(top.x).toEqual(2);
      expect(top.y).toEqual(3);
      expect(top.z).toEqual(2);
    });

    // bottom
    it('can get its bottom vector', function() {
      var vector = new CUBED.VECTOR(2, 2, 2);
      var bottom = vector.bottom();
      expect(bottom.x).toEqual(2);
      expect(bottom.y).toEqual(1);
      expect(bottom.z).toEqual(2);
    });
  });
});

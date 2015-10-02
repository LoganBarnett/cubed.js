'use strict';

const grid = require('./grid');
const voxel = require('./voxel');

describe('voxel', function() {
  describe('mesh generation', function() {
    it('generates a normal render mesh when there are no neighbors', function() {
      var voxels = [{position: {x: 1, y: 1, z: 1}, value: {}}];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 1, 0);
      expect(meshData.renderMesh).toBeTruthy();
      // bottom
      expect(meshData.renderMesh[0]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[1]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[2]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[3]).toEqual({x: 1, y: 1, z: 2});
      // top
      expect(meshData.renderMesh[4]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[5]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[6]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[7]).toEqual({x: 2, y: 2, z: 2});
      // right
      expect(meshData.renderMesh[8]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[9]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[10]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[11]).toEqual({x: 2, y: 2, z: 2});
      // left
      expect(meshData.renderMesh[12]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[13]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[14]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[15]).toEqual({x: 1, y: 2, z: 1});
      // front
      expect(meshData.renderMesh[16]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[17]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[18]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[19]).toEqual({x: 1, y: 2, z: 2});
      // back
      expect(meshData.renderMesh[20]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[21]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[22]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[23]).toEqual({x: 2, y: 2, z: 1});
    });

    it('omits generating a left side on the render mesh when there is a neighbor to the left', function() {
      var voxels = [
          {position: {x: 1, y: 1, z: 1}, value: {}}
        , {position: {x: 0, y: 1, z: 1}, value: {}}
      ];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 1, 0);
      expect(meshData.renderMesh).toBeTruthy();
      // bottom
      expect(meshData.renderMesh[0]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[1]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[2]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[3]).toEqual({x: 1, y: 1, z: 2});
      // top
      expect(meshData.renderMesh[4]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[5]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[6]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[7]).toEqual({x: 2, y: 2, z: 2});
      // right
      expect(meshData.renderMesh[8]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[9]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[10]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[11]).toEqual({x: 2, y: 2, z: 2});
      // front
      expect(meshData.renderMesh[12]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[13]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[14]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[15]).toEqual({x: 1, y: 2, z: 2});
      // back
      expect(meshData.renderMesh[16]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[17]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[18]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[19]).toEqual({x: 2, y: 2, z: 1});
    });

    it('omits generating a bottom side on the render mesh when there is a neighbor to the bottom', function() {
      var voxels = [
          {position: {x: 1, y: 1, z: 1}, value: {}}
        , {position: {x: 1, y: 0, z: 1}, value: {}}
      ];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 1, 0);
      expect(meshData.renderMesh).toBeTruthy();
      // top
      expect(meshData.renderMesh[0]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[1]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[2]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[3]).toEqual({x: 2, y: 2, z: 2});
      // right
      expect(meshData.renderMesh[4]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[5]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[6]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[7]).toEqual({x: 2, y: 2, z: 2});
      // left
      expect(meshData.renderMesh[8]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[9]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[10]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[11]).toEqual({x: 1, y: 2, z: 1});
      // front
      expect(meshData.renderMesh[12]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[13]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[14]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[15]).toEqual({x: 1, y: 2, z: 2});
      // back
      expect(meshData.renderMesh[16]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[17]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[18]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[19]).toEqual({x: 2, y: 2, z: 1});
    });

    it('omits generating a top side on the render mesh when there is a neighbor to the top', function() {
      var voxels = [
          {position: {x: 1, y: 1, z: 1}, value: {}}
        , {position: {x: 1, y: 2, z: 1}, value: {}}
      ];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 1, 0);
      expect(meshData.renderMesh).toBeTruthy();
      // bottom
      expect(meshData.renderMesh[0]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[1]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[2]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[3]).toEqual({x: 1, y: 1, z: 2});
      // right
      expect(meshData.renderMesh[4]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[5]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[6]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[7]).toEqual({x: 2, y: 2, z: 2});
      // left
      expect(meshData.renderMesh[8]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[9]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[10]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[11]).toEqual({x: 1, y: 2, z: 1});
      // front
      expect(meshData.renderMesh[12]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[13]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[14]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[15]).toEqual({x: 1, y: 2, z: 2});
      // back
      expect(meshData.renderMesh[16]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[17]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[18]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[19]).toEqual({x: 2, y: 2, z: 1});
    });

    it('omits generating a right side on the render mesh when there is a neighbor to the right', function() {
      var voxels = [
          {position: {x: 1, y: 1, z: 1}, value: {}}
        , {position: {x: 2, y: 1, z: 1}, value: {}}
      ];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 1, 0);
      expect(meshData.renderMesh).toBeTruthy();
      // bottom
      expect(meshData.renderMesh[0]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[1]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[2]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[3]).toEqual({x: 1, y: 1, z: 2});
      // top
      expect(meshData.renderMesh[4]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[5]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[6]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[7]).toEqual({x: 2, y: 2, z: 2});
      // left
      expect(meshData.renderMesh[8]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[9]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[10]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[11]).toEqual({x: 1, y: 2, z: 1});
      // front
      expect(meshData.renderMesh[12]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[13]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[14]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[15]).toEqual({x: 1, y: 2, z: 2});
      // back
      expect(meshData.renderMesh[16]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[17]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[18]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[19]).toEqual({x: 2, y: 2, z: 1});
    });

    it('omits generating a front side on the render mesh when there is a neighbor to the front', function() {
      var voxels = [
          {position: {x: 1, y: 1, z: 1}, value: {}}
        , {position: {x: 1, y: 1, z: 2}, value: {}}
      ];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 1, 0);
      expect(meshData.renderMesh).toBeTruthy();
      // bottom
      expect(meshData.renderMesh[0]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[1]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[2]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[3]).toEqual({x: 1, y: 1, z: 2});
      // top
      expect(meshData.renderMesh[4]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[5]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[6]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[7]).toEqual({x: 2, y: 2, z: 2});
      // right
      expect(meshData.renderMesh[8]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[9]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[10]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[11]).toEqual({x: 2, y: 2, z: 2});
      // left
      expect(meshData.renderMesh[12]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[13]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[14]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[15]).toEqual({x: 1, y: 2, z: 1});
      // back
      expect(meshData.renderMesh[16]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[17]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[18]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[19]).toEqual({x: 2, y: 2, z: 1});
    });

    it('omits generating a back side on the render mesh when there is a neighbor to the back', function() {
      var voxels = [
          {position: {x: 1, y: 1, z: 1}, value: {}}
        , {position: {x: 1, y: 1, z: 0}, value: {}}
      ];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 1, 0);
      expect(meshData.renderMesh).toBeTruthy();
      // bottom
      expect(meshData.renderMesh[0]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[1]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[2]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[3]).toEqual({x: 1, y: 1, z: 2});
      // top
      expect(meshData.renderMesh[4]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[5]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[6]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[7]).toEqual({x: 2, y: 2, z: 2});
      // right
      expect(meshData.renderMesh[8]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[9]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[10]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[11]).toEqual({x: 2, y: 2, z: 2});
      // left
      expect(meshData.renderMesh[12]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[13]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[14]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[15]).toEqual({x: 1, y: 2, z: 1});
      // front
      expect(meshData.renderMesh[16]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[17]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[18]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[19]).toEqual({x: 1, y: 2, z: 2});

      expect(meshData.renderMesh.length).toEqual(20); // only way to make sure the back is omitted correctly
    });

    it('generates a visible render mesh on the edge side when the voxel is on the edge of the grid', function() {
      var voxels = [{position: {x: 1, y: 1, z: 1}, value: {}}];
      const g = grid.create({size: {x: 3, y: 3, z: 2}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 1, 0);
      expect(meshData.renderMesh).toBeTruthy();
      // bottom
      expect(meshData.renderMesh[0]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[1]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[2]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[3]).toEqual({x: 1, y: 1, z: 2});
      // top
      expect(meshData.renderMesh[4]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[5]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[6]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[7]).toEqual({x: 2, y: 2, z: 2});
      // right
      expect(meshData.renderMesh[8]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[9]).toEqual({x: 2, y: 2, z: 1});
      expect(meshData.renderMesh[10]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[11]).toEqual({x: 2, y: 2, z: 2});
      // left
      expect(meshData.renderMesh[12]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[13]).toEqual({x: 1, y: 2, z: 2});
      expect(meshData.renderMesh[14]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[15]).toEqual({x: 1, y: 2, z: 1});
      // front
      expect(meshData.renderMesh[16]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[17]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[18]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[19]).toEqual({x: 1, y: 2, z: 2});
      // back
      expect(meshData.renderMesh[20]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[21]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[22]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[23]).toEqual({x: 2, y: 2, z: 1});
    });

    it('scales the voxel dimensions based on the voxelSize', function() {
      var voxels = [{position: {x: 1, y: 1, z: 1}, value: {}}];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 2, 0);
      expect(meshData.renderMesh).toBeTruthy();
      // bottom
      expect(meshData.renderMesh[0]).toEqual({x: 4, y: 2, z: 2});
      expect(meshData.renderMesh[1]).toEqual({x: 4, y: 2, z: 4});
      expect(meshData.renderMesh[2]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[3]).toEqual({x: 2, y: 2, z: 4});
      // top
      expect(meshData.renderMesh[4]).toEqual({x: 2, y: 4, z: 2});
      expect(meshData.renderMesh[5]).toEqual({x: 2, y: 4, z: 4});
      expect(meshData.renderMesh[6]).toEqual({x: 4, y: 4, z: 2});
      expect(meshData.renderMesh[7]).toEqual({x: 4, y: 4, z: 4});
      // right
      expect(meshData.renderMesh[8]).toEqual({x: 4, y: 2, z: 2});
      expect(meshData.renderMesh[9]).toEqual({x: 4, y: 4, z: 2});
      expect(meshData.renderMesh[10]).toEqual({x: 4, y: 2, z: 4});
      expect(meshData.renderMesh[11]).toEqual({x: 4, y: 4, z: 4});
      // left
      expect(meshData.renderMesh[12]).toEqual({x: 2, y: 2, z: 4});
      expect(meshData.renderMesh[13]).toEqual({x: 2, y: 4, z: 4});
      expect(meshData.renderMesh[14]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[15]).toEqual({x: 2, y: 4, z: 2});
      // front
      expect(meshData.renderMesh[16]).toEqual({x: 4, y: 2, z: 4});
      expect(meshData.renderMesh[17]).toEqual({x: 4, y: 4, z: 4});
      expect(meshData.renderMesh[18]).toEqual({x: 2, y: 2, z: 4});
      expect(meshData.renderMesh[19]).toEqual({x: 2, y: 4, z: 4});
      // back
      expect(meshData.renderMesh[20]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[21]).toEqual({x: 2, y: 4, z: 2});
      expect(meshData.renderMesh[22]).toEqual({x: 4, y: 2, z: 2});
      expect(meshData.renderMesh[23]).toEqual({x: 4, y: 4, z: 2});
    });

    it('generates triangles from the sides', function() {
      var voxels = [{position: {x: 1, y: 1, z: 1}, value: {}}];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 2, 0);
      expect(meshData.triangles).toBeTruthy();
      // bottom
      expect(meshData.triangles).toEqual(
        [
          [0, 1, 2], [1, 3, 2],
          [4, 5, 6], [5, 7, 6],
          [8, 9, 10], [9, 11, 10],
          [12, 13, 14], [13, 15, 14],
          [16, 17, 18], [17, 19, 18],
          [20, 21, 22], [21, 23, 22]
        ]
      );
    });

    it('generates uvs from verteces', function() {
      var voxels = [{position: {x: 1, y: 1, z: 1}, value: {}}];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 2, 0);
      expect(meshData.uvs).toBeTruthy();
      // just look at one side for this test
      expect(meshData.uvs[0][0]).toEqual({u: 0, v: 0});
      expect(meshData.uvs[0][1]).toEqual({u: 1, v: 0});
      expect(meshData.uvs[0][2]).toEqual({u: 0, v: 1});
      expect(meshData.uvs[0][3]).toEqual({u: 1, v: 1});

      expect(meshData.uvs.length).toEqual(12);
      expect(meshData.uvs[0].length).toEqual(4);
    });

    it('accumulates a vertex count', function() {
      var voxels = [{position: {x: 1, y: 1, z: 1}, value: {}}];
      const g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 2, 0);
      expect(meshData.vertexCount).toBeTruthy();
      expect(meshData.vertexCount).toEqual(4 * 6);
    });

    it('offsets triangle indicies by the vertex count', function() {
      var voxels = [{position: {x: 1, y: 1, z: 1}, value: {}}];
      var g = grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});

      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 2, 4);

      expect(meshData.triangles).toBeTruthy();
      // bottom
      expect(meshData.triangles[0]).toEqual([4, 5, 6]);
      expect(meshData.triangles[1]).toEqual([5, 7, 6]);
    });

    it('provides a vertexCount of 0 from a null voxel', function() {
      var g = grid.create({size: {x: 3, y: 3, z: 3}});
      var meshData = voxel.generate(g, grid.get, {x: 1, y: 1, z: 1}, 2, 0);
      expect(meshData.vertexCount).toEqual(0);
    });
  }); // describe generation

}); // describe voxel

'use strict';

define(['chunk'], function(chunk) {
  describe('chunk', function() {

    it('generates a render mesh from its cubes', function() {
      var grid = [
        [
          [{}, {}]
        ]
      ];

      var meshData = chunk.generate(grid);

      expect(meshData.renderMesh.length).toEqual(40); // 20 verts when one side is missing, x2 for two cubes
    });

    it('generates a render mesh when there is cube data missing from grid locations', function() {
      var grid = [
        [
          [{}, null]
        ]
      ];

      var meshData = chunk.generate(grid);

      expect(meshData.renderMesh.length).toEqual(24);
    });

  }); // describe chunk
}); // define
'use strict';

define(['cube'], function(cube) {

  describe('cube', function() {
    it('generates a normal render mesh when there are no neighbors', function() {
      var grid = [
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, {}, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
      ];

      var meshData = cube.generate(grid, {x: 1, y: 1, z: 1}, 1);
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
      expect(meshData.renderMesh[13]).toEqual({x: 2, y: 2, z: 2});
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
      var grid = [
        [
          [null, null, null],
          [null, {}, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, {}, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
      ];

      var meshData = cube.generate(grid, {x: 1, y: 1, z: 1}, 1);
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
      var grid = [
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ],
        [
          [null, {}, null],
          [null, {}, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
      ];

      var meshData = cube.generate(grid, {x: 1, y: 1, z: 1}, 1);
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
      expect(meshData.renderMesh[9]).toEqual({x: 2, y: 2, z: 2});
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
      var grid = [
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, {}, null],
          [null, {}, null]
        ],
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
      ];

      var meshData = cube.generate(grid, {x: 1, y: 1, z: 1}, 1);
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
      expect(meshData.renderMesh[9]).toEqual({x: 2, y: 2, z: 2});
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
      var grid = [
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, {}, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, {}, null],
          [null, null, null]
        ]
      ];

      var meshData = cube.generate(grid, {x: 1, y: 1, z: 1}, 1);
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
      expect(meshData.renderMesh[9]).toEqual({x: 2, y: 2, z: 2});
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
      var grid = [
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, {}, {}],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
      ];

      var meshData = cube.generate(grid, {x: 1, y: 1, z: 1}, 1);
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
      expect(meshData.renderMesh[13]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[14]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[15]).toEqual({x: 1, y: 2, z: 1});
      // back
      expect(meshData.renderMesh[16]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[17]).toEqual({x: 1, y: 2, z: 1});
      expect(meshData.renderMesh[18]).toEqual({x: 2, y: 1, z: 1});
      expect(meshData.renderMesh[19]).toEqual({x: 2, y: 2, z: 1});
    });

    it('omits generating a back side on the render mesh when there is a neighbor to the back', function() {
      var grid = [
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [{}, {}, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
      ];

      var meshData = cube.generate(grid, {x: 1, y: 1, z: 1}, 1);
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
      expect(meshData.renderMesh[13]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[14]).toEqual({x: 1, y: 1, z: 1});
      expect(meshData.renderMesh[15]).toEqual({x: 1, y: 2, z: 1});
      // front
      expect(meshData.renderMesh[16]).toEqual({x: 2, y: 1, z: 2});
      expect(meshData.renderMesh[17]).toEqual({x: 2, y: 2, z: 2});
      expect(meshData.renderMesh[18]).toEqual({x: 1, y: 1, z: 2});
      expect(meshData.renderMesh[19]).toEqual({x: 1, y: 2, z: 2});

      expect(meshData.renderMesh.length).toEqual(20); // only way to make sure the back is omitted correctly
    });
  }); // describe cube

}); // define
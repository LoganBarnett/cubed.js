'use strict';

(function(cubed) {
  var grid = cubed.grid = cubed.grid || {};

  grid.create = function(args) {
    var size = args.size;
    if(size == null) {
      return grid.identity;
    }
    if(!cubed.vector.isValid(args.size)) {
      return grid.identity;
    }
    var voxelTypes = args.voxelTypes;
    var values = args.values || [];
    //this.size = size;
    //if(voxelTypes) {
    //  this.voxelTypes = voxelTypes;
    //  this.voxelTypesLookup = {};
    //  voxelTypes.forEach(function(v) { this.voxelTypesLookup[v.name] = v; }, this);
    //}
    //else {
    //  this.voxelTypes = [];
    //}
    var g = new Array(size.x);
    for(var x = 0; x < g.length; ++x) {
      var yArray = g[x] = new Array(size.y);
      for(var y = 0; y < yArray.length; ++y) {
        var zArray = yArray[y] = new Array(size.z);
        for(var z = 0; z < zArray.length; ++z) {
          zArray[z] = null;
        }
      }
    }
    // TODO: Use mori or lodash here
    for(var i = 0; i < values.length; ++i) {
      var position = values[i].position;
      var voxel = values[i].voxel;
      g[position.x][position.y][position.z] = voxel;
    }
    return g;
  };

  grid.get = function(g, position) {
    var xArray = g[position.x];
    if(xArray == null) return null;
    var yArray = xArray[position.y];
    if(yArray == null) return null;
    return yArray[position.z];
  };

  grid.getSize = function(g) {
    var x = g.length;
    var y = g[0].length;
    var z = g[0][0].length;
    return {x: x, y: y, z: z};
  };

  grid.generate = function(g, chunkSize, voxelSize, voxelTypes) {
    var gridSize = grid.getSize(g);
    var chunkXLength = parseInt(gridSize.x / chunkSize.x);
    var chunkYLength = parseInt(gridSize.y / chunkSize.y);
    var chunkZLength = parseInt(gridSize.z / chunkSize.z);


    if(gridSize.x % chunkSize.x != 0) ++chunkXLength;
    if(gridSize.y % chunkSize.y != 0) ++chunkYLength;
    if(gridSize.z % chunkSize.z != 0) ++chunkZLength;

    var chunkDimensions = {x: chunkXLength, y: chunkYLength, z: chunkZLength};
    var chunks = [];
    for(var x = 0; x < chunkXLength; ++x) {
      for(var y = 0; y < chunkYLength; ++y) {
        for(var z = 0; z < chunkZLength; ++z) {
          var position = {x: x, y: y, z: z};
          var chunkMeshData = cubed.chunk.generate(g, chunkSize, position, voxelSize);
          chunks.push({position: position, voxel: chunkMeshData});
        }
      }
    }
    var chunkGrid = cubed.grid.create({size: chunkDimensions, voxels: chunks});
    return chunkGrid;
  };

  grid.getIterator = function(g) {
    var iterator = {};
    var x = 0;
    var y = 0;
    var z = 0;
    var gridSize = grid.getSize(g);
    var lastCell = false;
    iterator.next = function() {
      var done = lastCell;
      if(done) {
        return {
            done: true
          , value: null
        };
      }
      else {
        var position = {x: x, y: y, z: z};
        ++x;
        if(x >= gridSize.x) {
          x = 0;
          ++y;
          if(y >= gridSize.y) {
            y = 0;
            ++z;
            if(z >= gridSize.z) {
              lastCell = true;
            }
          }
        }
        var cellValue = grid.get(g, position);
        var iteration = {
          done:    done
          , value: {position: position, value: cellValue}
        };
        return iteration;
      }
    };
    return iterator;
  };

  cubed.onModuleReady(function() {
    grid.identity = grid.create({size: {x: 0, y: 0, z: 0}});
  });

  cubed.reportSubmoduleReady('grid');
}(cubed));

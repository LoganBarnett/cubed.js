// @flow

import type { Grid, GetterFn } from './grid.js'
import type { Triangle, Side } from './mesh.js'
import type { Vector3, Vector2, Uv } from './vector.js'
import type { Voxel } from './voxel.js'

const voxel = require('./voxel');
const chunk = {};

export type Chunk = {
  triangles: Array<Triangle>,
  vertexes: Array<Vector3>,
  uvs: Array<Array<Uv>>,
  materialIndexes: Array<number>,
}

chunk.empty = {
  materialIndexes: [],
  triangles: [],
  uvs: [],
  vertexes: [],
}

chunk.generate = <T>(
  matIndex: (p: Vector3, s: Side, v: T) => number,
  emptyCell: T,
  g: Grid<T>,
  getterFn: GetterFn<T>,
  chunkSize: Vector3,
  chunkOffset: Vector3,
  voxelSize: number
): Chunk => {

  const chunkMeshData = {
    vertexes: [],
    triangles: [],
    uvs: [],
    materialIndexes: [],
  };
  var vertexCount = 0;

  for(var x = 0; x < chunkSize.x; ++x) {
    for(var y = 0; y < chunkSize.y; ++y) {
      for(var z = 0; z < chunkSize.z; ++z) {
        var coords = {
            x: x + (chunkOffset.x * chunkSize.x)
          , y: y + (chunkOffset.y * chunkSize.y)
          , z: z + (chunkOffset.z * chunkSize.z)
        };
        // var voxel = cubed.grid.get(grid, coords);

        const voxelMeshData = voxel.generate(
          matIndex,
          emptyCell,
          g,
          getterFn,
          coords,
          voxelSize,
          vertexCount
        )
        // TODO: Build up a material index list here. Maybe have the index apply
        // as a list of numbers, with the expectation that it corresponds with
        // the triads of triangle indexes (triangles).
        vertexCount = voxelMeshData.vertexCount;
        chunkMeshData.materialIndexes = chunkMeshData.materialIndexes
          .concat(voxelMeshData.materialIndexes)
        chunkMeshData.vertexes = chunkMeshData.vertexes.concat(voxelMeshData.renderMesh);

        chunkMeshData.triangles = chunkMeshData.triangles.concat(voxelMeshData.triangles);

        chunkMeshData.uvs = chunkMeshData.uvs.concat(voxelMeshData.uvs)
      }
    }
  }

  return chunkMeshData;
};

module.exports = chunk;

// @flow

import type { Vector3 as intVector3, Vector2 as intVector2 } from './vector.js'
import type { Voxel as intVoxel } from './voxel.js'
import type { Grid as intGrid, GridCell as intGridCell } from './grid.js'
import type { Chunk as intChunk } from './chunk.js'
import type { Side as intSide, Triangle as intTriangle } from './mesh.js'

export type Vector3 = intVector3
export type Vector2 = intVector2
export type Grid<T> = intGrid<T>
export type GridCell<T> = intGridCell<T>
export type Voxel = intVoxel
export type Chunk = intChunk
export type Side = intSide
export type Triangle = intTriangle

var cubed = {
  grid: require('./grid'),
  chunk: require('./chunk'),
  voxel: require('./voxel'),
  vector: require('./vector'),
}

module.exports = cubed

// @flow

import type { Vector3, Vector2, } from './vector.js'

export type Triangle = [number, number, number]

export type Side =
  'bottom' |
  'top' |
  'right' |
  'left' |
  'front' |
  'back'

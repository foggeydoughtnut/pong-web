import type { Sprite } from "./Sprite"
import type { Transform } from "./Transform"

export type DataStore = {
  currentId: number,
  sprites: Map<number, Sprite>,
  transforms: Map<number, Transform>,
}
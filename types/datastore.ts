import type { BoxCollider } from "./Collider"
import type { KeyboardControlled } from "./keyboardControlled"
import type { Rigidbody } from "./rigidbody"
import type { Sprite } from "./Sprite"
import type { Transform } from "./Transform"

export type DataStore = {
  currentId: number,
  sprites: Map<number, Sprite>,
  transforms: Map<number, Transform>,
  rigidbodies: Map<number, Rigidbody>,
  keyboardControlled: Map<number, KeyboardControlled>,
  boxColliders: Map<number, BoxCollider>
}
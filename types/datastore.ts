import type { BoxCollider, KeyboardControlled, Rigidbody, Sprite, Transform, Solid } from "~/game/components"

export type DataStore = {
  currentId: number,
  sprites: Map<number, Sprite>,
  transforms: Map<number, Transform>,
  rigidbodies: Map<number, Rigidbody>,
  keyboardControlled: Map<number, KeyboardControlled>,
  boxColliders: Map<number, BoxCollider>
  solid: Map<number, Solid>
}
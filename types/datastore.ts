import type { BoxCollider, KeyboardControlled, Rigidbody, Sprite, Transform, Solid, Static, Bounceable } from "~/game/components"
import { ComponentMap } from "~/utils/ComponentMap"

export type DataStore = {
  currentId: number
  sprites: ComponentMap<Sprite>
  transforms: ComponentMap<Transform>
  rigidbodies: ComponentMap<Rigidbody>
  keyboardControlled: ComponentMap<KeyboardControlled>
  boxColliders: ComponentMap<BoxCollider>
  solid: ComponentMap<Solid>
  statics: ComponentMap<Static>
  bounceable: ComponentMap<Bounceable>
}
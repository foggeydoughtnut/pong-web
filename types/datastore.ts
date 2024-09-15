import type { BoxCollider, KeyboardControlled, Rigidbody, Sprite, Transform, Solid, Static, Bounceable, ReflectDirection } from "~/game/components"
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
  reflectDirections: ComponentMap<ReflectDirection>
}
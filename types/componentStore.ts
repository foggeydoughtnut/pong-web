import type { BoxCollider, KeyboardControlled, Rigidbody, Sprite, Transform, Solid, Static, Bounceable, ReflectDirection, SoundEffect, GameText, Score, Ball } from "~/game/components"
import type { Goal } from "~/game/components/goal"
import { ComponentMap } from "~/utils/ComponentMap"

export type ComponentStore = {
  sprites: ComponentMap<Sprite>
  transforms: ComponentMap<Transform>
  rigidbodies: ComponentMap<Rigidbody>
  keyboardControlled: ComponentMap<KeyboardControlled>
  boxColliders: ComponentMap<BoxCollider>
  solid: ComponentMap<Solid>
  statics: ComponentMap<Static>
  bounceable: ComponentMap<Bounceable>
  reflectDirections: ComponentMap<ReflectDirection>
  gameTexts: ComponentMap<GameText>
  scores: ComponentMap<Score>
  goals: ComponentMap<Goal>
  balls: ComponentMap<Ball> // REMIND TO ASK ABOUT HTIS
}
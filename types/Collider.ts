import type { Transform } from "./Transform"

export type CollisionEvent = {
  entityA: number;
  entityB: number
}

export type BoxCollider = {
  size: {
    width: number;
    height: number;
  }
}
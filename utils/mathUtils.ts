import type { Vector2 } from "~/game/components";

export function vec2(x: number, y: number): Vector2 {
  return { x, y }
}

export const Vec2 = {
  multiply(vector: Vector2, num: number): Vector2 {
    return vec2(vector.x * num, vector.y * num);
  },
  add(vec1: Vector2, otherVec: Vector2): Vector2 {
    return vec2(vec1.x + otherVec.x, vec1.y + otherVec.y);
  },
  neg(vec: Vector2){
    return vec2(-vec.x, -vec.y)
  },
  sub(vec1: Vector2, vec2: Vector2){
    return this.add(vec1, this.neg(vec2))
  },
  dot(vec1: Vector2, vec2: Vector2){
    return (vec1.x * vec2.x + vec1.y * vec2.y);
  },
  norm(vec: Vector2){
    return this.multiply(vec, 1/(this.dot(vec, vec) || 1));
  },
  reflectX(vec: Vector2) {
    return vec2(-vec.x, vec.y);
  },
  reflectY(vec: Vector2) {
    return vec2(vec.x, -vec.y)
  }
}
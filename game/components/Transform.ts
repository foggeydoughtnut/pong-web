import type { Position } from "./Point";

export type Transform = {
  position: Position;
  prevPosition: Position;
  rotation: number;
}
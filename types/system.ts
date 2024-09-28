export interface System {
  update(deltatime: number): void;
  draw(context: CanvasRenderingContext2D): void;
  systemName: string;
}
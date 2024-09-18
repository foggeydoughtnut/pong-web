export interface System {
  update(deltatime: number): void;
  draw(): void;
  systemName: string;
}
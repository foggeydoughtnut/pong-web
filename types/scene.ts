export interface Scene {
  createEntities(): void;
  handleInput(deltaTime: number): void;
  update(deltaTime: number): void;
  render(): void;
  sceneName: string;
}

export type ScenesAvailable = "main-game" | "game-over" | "main-menu"
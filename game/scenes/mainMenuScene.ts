import type { Scene } from "~/types";
import {
  createBlankBackground,
  createText,
} from "../entities";
import { renderSystem, physicSystem, collisionSystem, inputSystem, solidSystem, audioSystem, textRenderSystem } from '~/game/systems';
import { timerSystem } from '~/game/systems/timerSystem';
import { StaticValues } from "../staticValues";

export const mainMenuScene: Scene = {
  sceneName: "Main Menu",
  createEntities() {
    const gameStore = useGameStore();
    createBlankBackground();
    createText(vec2(gameStore.gameConfig.resolution.width/2, gameStore.gameConfig.resolution.height/3), "Pong", 32)
  },
  handleInput(deltaTime: number) {
    inputSystem.update(deltaTime);
  },
  update(deltaTime: number) {
    physicSystem.update(deltaTime);
    collisionSystem.update(deltaTime);
    solidSystem.update(deltaTime);
    audioSystem.update(deltaTime);
    timerSystem.update(deltaTime);
  },
  render() {
    renderSystem.draw();
    textRenderSystem.draw();
    if (StaticValues.DEBUG) {
      collisionSystem.draw();
    }
  }
}
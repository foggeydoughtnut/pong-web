import type { Scene } from "~/types";
import {
  createBlankBackground,
  createCursor,
  createText,
} from "../entities";
import { renderSystem, physicSystem, collisionSystem, inputSystem, solidSystem, audioSystem, textRenderSystem, uiCollisionSystem, buttonSystem } from '~/game/systems';
import { timerSystem } from '~/game/systems/timerSystem';
import { StaticValues } from "../staticValues";
import { createButton } from "../entities/button";

export const mainMenuScene: Scene = {
  sceneName: "Main Menu",
  createEntities() {
    const gameStore = useGameStore();
    createBlankBackground();
    createText(
      vec2(gameStore.gameConfig.resolution.width/2, gameStore.gameConfig.resolution.height/3),
      "Pong",
      32
    );

    createButton(
      vec2(gameStore.gameConfig.resolution.width/2 + 16, gameStore.gameConfig.resolution.height/3 + 40),
      "Play",
      () => (gameStore.sceneSwitchQueue.add('main-game')),
      { 
        size: {width: 64, height: 32},
        offset: { x: -36, y: -12 }
      }
    );

    createCursor(gameStore.mousePosition, { size: { width: 16, height: 24 }, offset: { x: -4, y: -4 }})
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
    uiCollisionSystem.update(deltaTime);
    buttonSystem.update(deltaTime);
  },
  render() {
    renderSystem.draw();
    textRenderSystem.draw();
    if (StaticValues.DEBUG) {
      collisionSystem.draw();
      uiCollisionSystem.draw();
    }
  }
}
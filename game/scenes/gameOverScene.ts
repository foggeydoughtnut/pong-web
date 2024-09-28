import type { Scene } from "~/types";
import {
  createBlankBackground,
  createCursor,
  createFloor,
  createRoof,
  createText,
} from "../entities";
import { renderSystem, physicSystem, collisionSystem, inputSystem, solidSystem, audioSystem, textRenderSystem, uiCollisionSystem, buttonSystem } from '~/game/systems';
import { timerSystem } from '~/game/systems/timerSystem';
import { StaticValues } from "../staticValues";
import { createButton } from "../entities/button";

export const gameOverScene: Scene = {
  sceneName: "Game Over",
  createEntities() {
    const gameStore = useGameStore();
    createBlankBackground();
    createText(
      vec2(gameStore.gameConfig.resolution.width/2, gameStore.gameConfig.resolution.height/3),
      "Game Over",
      32
    );
    
    createButton(
      vec2(gameStore.gameConfig.resolution.width/2 - 8, gameStore.gameConfig.resolution.height/3 + 44),
      "Restart",
      () => (gameStore.queueSceneSwitch('main-game')),
      { 
        size: {width: 128, height: 32},
        offset: { x: -56, y: -12 }
      }
    );

    createButton(
      vec2(gameStore.gameConfig.resolution.width/2, gameStore.gameConfig.resolution.height/3 + 88),
      "Main Menu",
      () => (gameStore.queueSceneSwitch('main-menu')),
      { 
        size: {width: 128, height: 32},
        offset: { x: -64, y: -14 }
      }
    );
    createCursor(gameStore.mousePosition, { size: { width: 16, height: 8 }, offset: { x: -4, y: -4 }})
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
  render(context: CanvasRenderingContext2D) {
    renderSystem.draw(context);
    textRenderSystem.draw(context);
    if (StaticValues.DEBUG) {
      collisionSystem.draw(context);
      uiCollisionSystem.draw(context);
    }
  }
}
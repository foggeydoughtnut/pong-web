import type { Scene } from "~/types";
import {
  createBackground,
  createFloor,
  createRoof,
} from "../entities";
import { renderSystem, physicSystem, collisionSystem, inputSystem, solidSystem, bouncingSystem, audioSystem, textRenderSystem, goalSystem } from '~/game/systems';
import { timerSystem } from '~/game/systems/timerSystem';
import { StaticValues } from "../staticValues";

export const gameOverScene: Scene = {
  sceneName: "Main Game",
  createEntities() {
    createBackground();
    createFloor();
    createRoof();
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
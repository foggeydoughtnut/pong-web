import type { Scene } from "~/types";
import {
  createFloor,
  createRoof,
  createPlayerOne,
  createPlayerTwo,
  createScore,
  createGoal,
  createGameTimer,
  createBall,
  createGameBackground
} from "../entities";
import { renderSystem, physicSystem, collisionSystem, inputSystem, solidSystem, bouncingSystem, audioSystem, textRenderSystem, goalSystem } from '~/game/systems';
import { timerSystem } from '~/game/systems/timerSystem';
import { StaticValues } from "../staticValues";

export const mainGameScene: Scene = {
  sceneName: "Main Game",
  createEntities() {
    createGameBackground();
    createFloor();
    createRoof();

    const playerOneId = createPlayerOne();
    const playerTwoId = createPlayerTwo();

    createScore(vec2(80, 24), playerOneId);
    createScore(vec2(270, 24), playerTwoId);
    createGoal(vec2(360, 0), playerOneId);
    createGoal(vec2(-16, 0), playerTwoId);

    createGameTimer(vec2(80, 96), () => (createBall(-1)));
  },
  handleInput(deltaTime: number) {
    inputSystem.update(deltaTime);
  },
  update(deltaTime: number) {

    physicSystem.update(deltaTime);
    collisionSystem.update(deltaTime);
    solidSystem.update(deltaTime);
    bouncingSystem.update(deltaTime);
    goalSystem.update(deltaTime);
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
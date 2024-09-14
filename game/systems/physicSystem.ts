import type { System } from "~/types";
import { Vec2 } from "~/utils/mathUtils";

export const physicSystem: System = {
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [key, value] of  gameStore.dataStore.rigidbodies.entries()){
      const posDelta = Vec2.multiply(value.velocity, deltatime);
      const currentPosition = gameStore.dataStore.transforms.get(key);
      if (!currentPosition){
        logger.error(`Missing a transform for entity ${key}`)
        continue;
      }
      gameStore.dataStore.transforms.set(key, {...currentPosition, position: Vec2.add(currentPosition.position, posDelta)});
    }
  },
  draw(){}
}
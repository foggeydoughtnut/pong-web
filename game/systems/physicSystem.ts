import type { System } from "~/types";
import { Vec2 } from "~/utils/mathUtils";

export const physicSystem: System = {
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [key, value] of  gameStore.dataStore.rigidbodies.entries()){
      const posDelta = Vec2.multiply(value.velocity, deltatime);
      const currentPosition = gameStore.dataStore.transforms.get(key);
      if (currentPosition) {
        gameStore.dataStore.transforms.update(key, (prevVal) => {
          return {
            rotation: prevVal.rotation,
            prevPosition: prevVal.position,
            position: Vec2.add(currentPosition.position, posDelta)
          }
        });

      } else {
        logger.error(`Missing a transform for entity ${key}`);
        continue;
      }
    }
  },
  draw(){
  }
}
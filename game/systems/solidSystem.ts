import type { System } from "~/types";
import { Vec2 } from "~/utils/mathUtils";

export const solidSystem: System = {
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [key, value] of  gameStore.dataStore.solid.entries()){
      // Check if key is in the map of collisions
      if (!gameStore.dataStore.statics.get(key) && gameStore.collidedEvents.get(key)?.some((num: number) => gameStore.dataStore.solid.has(num))) {
        const transform = gameStore.dataStore.transforms.get(key);
        if (transform?.prevPosition) {
          gameStore.dataStore.transforms.set(key, {...transform, position: transform.prevPosition});
        } else {
          logger.error(`previous position for entity: ${key} didn't exist`);
        }
      }
    }
  },
  draw(){
  }
}
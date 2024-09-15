import type { System } from "~/types";
import { Vec2 } from "~/utils/mathUtils";
import type { Transform } from "../components";

export const solidSystem: System = {
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [key, value] of  gameStore.dataStore.solid.entries()){
      // Check if key is in the map of collisions
      if (!gameStore.dataStore.statics.get(key) && gameStore.collidedEvents.get(key)?.some((num: number) => gameStore.dataStore.solid.has(num))) {
        gameStore.dataStore.transforms.update(key, (val: Transform) => ({...val, position: val.prevPosition}));
      }
    }
  },
  draw(){
  }
}
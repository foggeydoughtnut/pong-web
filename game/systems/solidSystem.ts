import type { System } from "~/types";
import { Vec2 } from "~/utils/mathUtils";
import type { Transform } from "../components";

export const solidSystem: System = {
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let key of gameStore.dataStore.solid.keys()){
      // Check if key is in the map of collisions
      const collidedEvents = Array.from(gameStore.collidedEvents.get(key)?.values() ?? [])
      if (!gameStore.dataStore.statics.get(key) && collidedEvents.some((num: number) => { return gameStore.dataStore.solid.has(num)})) {
        gameStore.dataStore.transforms.update(key, (val: Transform) => ({...val, position: val.prevPosition}));
      }
    }
  },
  draw(){
  }
}
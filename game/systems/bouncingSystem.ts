import type { System } from "~/types";
import type { Rigidbody } from "../components";

export const bouncingSystem: System = {
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [key, value] of  gameStore.dataStore.bounceable.entries()){
      // Check if key is in the map of collisions
      if (gameStore.collidedEvents.get(key)?.some((num: number) => gameStore.dataStore.bounceable.has(num))) {        
        gameStore.dataStore.rigidbodies.update(key, (val: Rigidbody) => ({...val, velocity: Vec2.reflectX(val.velocity)}));
      }
    }
  },
  draw(){
  }
}
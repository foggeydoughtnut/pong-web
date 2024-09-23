import type { System } from "~/types";
import { Vec2 } from "~/utils/mathUtils";
import type { Timer } from "../components";

export const timerSystem: System = {
  systemName: "Timer System",
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [key, timer] of gameStore.componentStore.timers.entries()){
      // Check if key is in the map of collisions
      
      if (timer.remainingTime - deltatime < 0) {
        timer.callback();
        gameStore.deleteEntity(key, timerSystem);
      } else {
        timer.remainingTime -= deltatime;
      }
    }
  },
  draw(){
  }
}
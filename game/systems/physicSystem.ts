import type { System } from "~/types";
import { Vec2 } from "~/utils/mathUtils";

export const physicSystem: System = {
  update(deltatime: number){
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [key, value] of  gameStore.dataStore.rigidbodies.entries()){
      const posDelta = Vec2.multiply(value.velocity, value.speed * deltatime);
      gameStore.dataStore.transforms.update(key, (prevVal) => {
        return {
          rotation: prevVal.rotation,
          prevPosition: prevVal.position,
          position: Vec2.add(prevVal.position, posDelta)
        }
      });
    }
  },
  draw(){
  }
}
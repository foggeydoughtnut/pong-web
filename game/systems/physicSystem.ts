import type { System } from "~/types";
import { Vec2 } from "~/utils/mathUtils";

export const physicSystem: System = {
  systemName: "Physics System",
  update(deltatime: number){
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [key, value] of  gameStore.componentStore.rigidbodies.entries()){
      const posDelta = Vec2.multiply(value.velocity, value.speed * deltatime);
      gameStore.componentStore.transforms.update(key, (prevVal) => {
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
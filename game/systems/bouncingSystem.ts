import type { System } from "~/types";
import type { Rigidbody } from "../components";

export const bouncingSystem: System = {
  systemName: "Bouncing System",
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let key of gameStore.componentStore.bounceable.keys()){
      // Check if key is in the map of collisions
      const collisions = gameStore.collidedEvents.get(key);
      if (collisions) {
        for (const collidedWithKey of collisions) {
          if (collidedWithKey !== key) {
            const reflect = gameStore.componentStore.reflectDirections.get(collidedWithKey);
            if (reflect) {
              if (reflect.direction === 'X') {
                gameStore.componentStore.rigidbodies.update(key, (val: Rigidbody) => ({...val, velocity: Vec2.reflectX(val.velocity), speed: val.speed + 10 }));
                gameStore.addSoundEffectEvent(key, 'playerBounce');
              }
              if (reflect.direction === "Y") {
                gameStore.componentStore.rigidbodies.update(key, (val: Rigidbody) => ({...val, velocity: Vec2.reflectY(val.velocity), speed: val.speed + 10 }));
                gameStore.addSoundEffectEvent(key, 'wallBounce');
              }
            }
          }
        }
      }
    }
  },
  draw(){
  }
}
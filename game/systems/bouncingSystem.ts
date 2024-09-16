import type { System } from "~/types";
import type { Rigidbody } from "../components";

export const bouncingSystem: System = {
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let key of gameStore.dataStore.bounceable.keys()){
      // Check if key is in the map of collisions
      const collisions = gameStore.collidedEvents.get(key);
      if (collisions) {
        for (const collidedWithKey of collisions) {
          if (collidedWithKey !== key) {
            const reflect = gameStore.dataStore.reflectDirections.get(collidedWithKey);
            if (reflect) {
              if (reflect.direction === 'X') {
                gameStore.dataStore.rigidbodies.update(key, (val: Rigidbody) => ({...val, velocity: Vec2.reflectX(val.velocity)}));
                gameStore.addSoundEffectEvent(key, 'playerBounce');
                const score = gameStore.dataStore.scores.get(collidedWithKey);
                if (score) { 
                  gameStore.dataStore.scores.update(collidedWithKey, (prevVal) => ({ score: prevVal.score + 1 }))
                }
              }
              if (reflect.direction === "Y") {
                gameStore.dataStore.rigidbodies.update(key, (val: Rigidbody) => ({...val, velocity: Vec2.reflectY(val.velocity)}));
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
import type { System } from "~/types";
import { createBall, createGameTimer } from "../entities";

export const goalSystem: System = {
  systemName: "Goal System",
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [key, goal] of gameStore.componentStore.goals.entries()){
      // Check if key is in the map of collisions
      const collisions = gameStore.collidedEvents.get(key);
      if (collisions) {
        for (const collidedWithKey of collisions) {
          if (collidedWithKey !== key) {
            // If the collided with is a ball
            const ball = gameStore.componentStore.balls.get(collidedWithKey)
            if (ball) {
              gameStore.addSoundEffectEvent(key, 'score');
              const score = gameStore.componentStore.scores.get(goal.playerId);
              if (score) { 
                gameStore.componentStore.scores.update(goal.playerId, (prevVal) => ({ score: prevVal.score + 1 }));
                // Delete ball
                gameStore.deleteEntity(collidedWithKey, goalSystem);
                const goalTransform = gameStore.componentStore.transforms.get(key)
                if (goalTransform) {
                  if (goalTransform.position.x < 180) {
                    createGameTimer(vec2(80, 96), () => (createBall(-1)));
                  } else {
                    createGameTimer(vec2(270, 96), () => (createBall(1)));
                  }
                }
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
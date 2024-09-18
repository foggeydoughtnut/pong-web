import type { System } from "~/types";

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
import type { System } from "~/types";

export const collisionSystem: System = {
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    const entries = gameStore.dataStore.boxColliders.entries()
    for (let [idA, colliderA] of entries) {

      const transformA = gameStore.dataStore.transforms.get(idA);
      if (transformA) {
        for (let [idB, _] of entries) {

          const transformB = gameStore.dataStore.transforms.get(idB);
          if (transformB) {
            if (idA !== idB) {
              if (
                Math.abs(transformA.position.x - transformB.position.x) < colliderA.size.width &&
                Math.abs(transformA.position.y - transformB.position.y) < colliderA.size.height
              ) {
                gameStore.collidedEvents.add({
                  entityA: idA,
                  entityB: idB
                });
                console.log('collided')
              }
            }
          } else {
            console.error("Transform not found on entity ", idB);
          }
        }
      } else {
        console.error("No transform found on object: ", idA)
      }
    }
  },
  draw(){


  }
}
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
                gameStore.addCollisionEvent(idA, idB);
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
    const gameStore = useGameStore();
    if (gameStore.canvasContext) {
      for (let [key, collider] of  gameStore.dataStore.boxColliders.entries()) {
        const transform = gameStore.dataStore.transforms.get(key);
        if (transform) {
          if (gameStore.collidedEvents.has(key)) {
            gameStore.canvasContext.strokeStyle = "red";
          } else {
            gameStore.canvasContext.strokeStyle = "green";
          }
          gameStore.canvasContext.lineWidth = 1
          gameStore.canvasContext.strokeRect(transform.position.x, transform.position.y, collider.size.width, collider.size.height);
        }
      }
    }

  }
}
import type { System } from "~/types";
import type { BoxCollider, Transform } from "../components";

const intersects = (entityA: { transform: Transform, collider: BoxCollider}, entityB: { transform: Transform, collider: BoxCollider}) => {
  const entityADimensions = {
    left: entityA.transform.position.x,
    right: entityA.transform.position.x + entityA.collider.size.width,
    top: entityA.transform.position.y,
    bottom: entityA.transform.position.y + entityA.collider.size.height,
  } 

  const entityBDimensions = {
    left: entityB.transform.position.x,
    right: entityB.transform.position.x + entityB.collider.size.width,
    top: entityB.transform.position.y,
    bottom: entityB.transform.position.y + entityB.collider.size.height,
  } 

  return (entityADimensions.left <= entityBDimensions.right &&
        entityBDimensions.left <= entityADimensions.right &&
        entityADimensions.top <= entityBDimensions.bottom &&
        entityBDimensions.top <= entityADimensions.bottom)
  
}

export const collisionSystem: System = {
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [idA, colliderA] of gameStore.dataStore.boxColliders.entries()) {
      const transformA = gameStore.dataStore.transforms.get(idA);
      if (transformA) {
        for (let [idB, colliderB] of gameStore.dataStore.boxColliders.entries()) {
          const transformB = gameStore.dataStore.transforms.get(idB);
          if (transformB) {
            if (idA !== idB) {
              if (intersects({ transform: transformA, collider: colliderA }, { transform: transformB, collider: colliderB })) {
                gameStore.addCollisionEvent(idA, idB);
              }

              // if (
              //   Math.abs(transformA.position.x - transformB.position.x) < colliderA.size.width &&
              //   Math.abs(transformA.position.y - transformB.position.y) < colliderA.size.height
              // ) {
              //   gameStore.addCollisionEvent(idA, idB);
              // }

              
              
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
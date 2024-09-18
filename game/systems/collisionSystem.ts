import type { System } from "~/types";
import type { BoxCollider, Transform } from "../components";

const intersects = (entityA: { transform: Transform, collider: BoxCollider}, entityB: { transform: Transform, collider: BoxCollider}) => {
  const entityADimensions = {
    left: entityA.transform.position.x + entityA.collider.offset.x,
    right: entityA.transform.position.x + entityA.collider.size.width + entityA.collider.offset.x,
    top: entityA.transform.position.y + entityA.collider.offset.y,
    bottom: entityA.transform.position.y + entityA.collider.size.height + entityA.collider.offset.y,
  } 

  const entityBDimensions = {
    left: entityB.transform.position.x + entityB.collider.offset.x,
    right: entityB.transform.position.x + entityB.collider.size.width + entityB.collider.offset.x,
    top: entityB.transform.position.y + entityB.collider.offset.y,
    bottom: entityB.transform.position.y + entityB.collider.size.height + entityB.collider.offset.y,
  } 

  return (entityADimensions.left <= entityBDimensions.right &&
        entityBDimensions.left <= entityADimensions.right &&
        entityADimensions.top <= entityBDimensions.bottom &&
        entityBDimensions.top <= entityADimensions.bottom)
  
}

export const collisionSystem: System = {
  systemName: "Collision System",
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [idA, colliderA] of gameStore.componentStore.boxColliders.entries()) {
      const transformA = gameStore.componentStore.transforms.get(idA);
      if (transformA) {
        for (let [idB, colliderB] of gameStore.componentStore.boxColliders.entries()) {
          const transformB = gameStore.componentStore.transforms.get(idB);
          if (transformB) {
            if (idA !== idB) {
              if (intersects({ transform: transformA, collider: colliderA }, { transform: transformB, collider: colliderB })) {
                gameStore.addCollisionEvent(idA, idB);
              }              
            }
          } else {
            logger.error(`Transform not found on entity ${idB}`);
          }
        }
      } else {
        logger.error(`Transform not found on entity ${idA}`);
      }
    }
  },
  draw(){
    const gameStore = useGameStore();
    if (gameStore.canvasContext) {
      for (let [key, collider] of  gameStore.componentStore.boxColliders.entries()) {
        const transform = gameStore.componentStore.transforms.get(key);
        if (transform) {
          if (gameStore.collidedEvents.has(key)) {
            gameStore.canvasContext.strokeStyle = "red";
          } else {
            gameStore.canvasContext.strokeStyle = "green";
          }
          gameStore.canvasContext.lineWidth = 1
          gameStore.canvasContext.strokeRect(transform.position.x + collider.offset.x, transform.position.y + collider.offset.y, collider.size.width, collider.size.height);
        }
      }
    }

  }
}
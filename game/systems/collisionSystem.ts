import type { System } from "~/types";

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
  draw(context: CanvasRenderingContext2D){
    const gameStore = useGameStore(); 
    for (let [key, collider] of  gameStore.componentStore.boxColliders.entries()) {
      const transform = gameStore.componentStore.transforms.get(key);
      if (transform) {
        if (gameStore.collidedEvents.has(key)) {
          context.strokeStyle = "red";
        } else {
          context.strokeStyle = "green";
        }
        context.lineWidth = 1
        if (gameStore.paused) {
          if (gameStore.componentStore.pauseElements.has(key)) {
            context.strokeRect(transform.position.x + collider.offset.x, transform.position.y + collider.offset.y, collider.size.width, collider.size.height);
          }
        } else {
          context.strokeRect(transform.position.x + collider.offset.x, transform.position.y + collider.offset.y, collider.size.width, collider.size.height);
        }
      }
    }
  }
}
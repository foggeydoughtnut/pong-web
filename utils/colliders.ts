import type { BoxCollider, Transform } from "~/game/components"

export const intersects = (entityA: { transform: Transform, collider: BoxCollider}, entityB: { transform: Transform, collider: BoxCollider}) => {
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
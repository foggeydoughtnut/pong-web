import type { UiCollider, Vector2 } from "../components";

export const createCursor = (position: Vector2, collider: UiCollider, partOfPauseUI = false): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  

  gameStore.componentStore.transforms.add(id, { 
    position: position,
    prevPosition: position,
    rotation: 0
  });

  gameStore.componentStore.uiBoxColliders.add(id, collider);

  gameStore.componentStore.cursors.add(id, {});

  if (partOfPauseUI) {
    gameStore.componentStore.pauseElements.add(id, {});
  }

  return id;

}
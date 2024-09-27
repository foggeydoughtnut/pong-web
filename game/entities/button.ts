import type { UiCollider, Vector2 } from "../components";

export const createButton = (position: Vector2, text: string, callback: () => void, collider: UiCollider): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  

  gameStore.componentStore.gameTexts.add(id, {
    text: () => (text),
    fontFamily: "sans-serif",
    size: 24,
    color: 'white'
  })
  gameStore.componentStore.transforms.add(id, { 
    position: position,
    prevPosition: position,
    rotation: 0
  });

  gameStore.componentStore.uiBoxColliders.add(id, collider);

  gameStore.componentStore.buttons.add(id, {
    callback: callback
  });
  
  return id;

}
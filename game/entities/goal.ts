import type { Vector2 } from "../components";

export const createGoal = (position: Vector2, playerId: number) => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.componentStore.transforms.add(id, { 
    position: position,
    prevPosition: position,
    rotation: 0
  });

  gameStore.componentStore.boxColliders.add(id, {
    size: {
      width: 4,
      height: 250,
    },
    offset: {
      x: 0,
      y: 10
    }
  });

  gameStore.componentStore.goals.add(id, {
    playerId: playerId
  });


  return id;
}
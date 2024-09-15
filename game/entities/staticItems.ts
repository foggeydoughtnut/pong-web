import type { Vector2 } from "../components";

export const createStaticBox = (position: Vector2): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.sprites.set(id, { 
    textureName: "blackBox" 
  });
  gameStore.dataStore.transforms.set(id, { 
    position: vec2(position.x, position.y),
    prevPosition: vec2(position.x, position.y),
    rotation: 0
  });
  gameStore.dataStore.boxColliders.set(id, {
    size: {
      width: 16,
      height: 16
    }
  });
  gameStore.dataStore.solid.set(id, {})
  return id;
}
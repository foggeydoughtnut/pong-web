import type { Vector2 } from "../components";

export const createStaticBox = (position: Vector2): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.sprites.add(id, { 
    textureName: "blackBox" 
  });
  gameStore.dataStore.transforms.add(id, { 
    position: vec2(position.x, position.y),
    prevPosition: vec2(position.x, position.y),
    rotation: 0
  });
  gameStore.dataStore.boxColliders.add(id, {
    size: {
      width: 16,
      height: 16
    }
  });
  gameStore.dataStore.solid.add(id, {});
  gameStore.dataStore.statics.add(id, {});
  return id;
}
import { vec2 } from "~/utils/mathUtils";

export function createPlayerOne(): number{
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.sprites.add(id, { 
    textureName: "testingSmallerSprite" 
  });
  gameStore.dataStore.transforms.add(id, { 
    position: vec2(150, 250),
    prevPosition: vec2(150, 250),
    rotation: 0
  });
  gameStore.dataStore.rigidbodies.add(id, { 
    velocity: vec2(0, 0),
    speed: 100
  });
  gameStore.dataStore.keyboardControlled.add(id, {});
  gameStore.dataStore.boxColliders.add(id, {
    size: {
      width: 16,
      height: 16
    }
  });
  gameStore.dataStore.solid.add(id, {});
  gameStore.dataStore.bounceable.add(id, {});
  return id;
}
import { vec2 } from "~/utils/mathUtils";

export function createBall(): number{
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.sprites.add(id, { 
    textureName: "ball" 
  });
  gameStore.dataStore.transforms.add(id, { 
    position: vec2(180, 135),
    prevPosition: vec2(180, 135),
    rotation: 0
  });
  gameStore.dataStore.rigidbodies.add(id, { 
    velocity: vec2(-1, 0.5),
    speed: 100
  });
  gameStore.dataStore.boxColliders.add(id, {
    size: {
      width: 8,
      height: 8
    },
    offset: {
      x: 4,
      y: 4,
    }
  });
  gameStore.dataStore.solid.add(id, {});
  gameStore.dataStore.bounceable.add(id, {});
  return id;
}
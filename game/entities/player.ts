import { vec2 } from "~/utils/mathUtils";

export function createPlayerOne(): number{
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.sprites.add(id, { 
    textureName: "player" 
  });
  gameStore.dataStore.transforms.add(id, { 
    position: vec2(8, 135),
    prevPosition: vec2(8, 135),
    rotation: 0
  });
  gameStore.dataStore.rigidbodies.add(id, { 
    velocity: vec2(0, 0),
    speed: 100
  });
  gameStore.dataStore.keyboardControlled.add(id, {
    keybinds: {
      UP: 'w',
      DOWN: 's'
    }
  });
  gameStore.dataStore.boxColliders.add(id, {
    size: {
      width: 8,
      height: 32
    },
    offset: {
      x: 4,
      y: 0,
    }
  });
  gameStore.dataStore.solid.add(id, {});
  gameStore.dataStore.bounceable.add(id, {});
  return id;
}
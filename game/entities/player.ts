import { vec2 } from "~/utils/mathUtils";
import type { KeyboardControlled, Transform } from "../components";

function createPlayer(keybinds: KeyboardControlled['keybinds'], transform: Transform) {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.sprites.add(id, { 
    textureName: "player" 
  });
  gameStore.dataStore.transforms.add(id, { 
    position: vec2(transform.position.x, transform.position.y),
    prevPosition: vec2(transform.position.x, transform.position.y),
    rotation: transform.rotation
  });
  gameStore.dataStore.rigidbodies.add(id, { 
    velocity: vec2(0, 0),
    speed: 10
  });
  gameStore.dataStore.keyboardControlled.add(id, { keybinds: keybinds});
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
  gameStore.dataStore.reflectDirections.add(id, { direction: "X" })
  return id;
}

export function createPlayerOne(): number{
  const playerId = createPlayer({
    UP: 'w',
    DOWN: 's'
  }, {
    position: {
      x: 0,
      y: 135
    },
    prevPosition: {
      x: 0,
      y: 135
    },
    rotation: 0
  });
  return playerId;
}


export function createPlayerTwo(): number{
  const playerId = createPlayer({
    UP: 'i',
    DOWN: 'k'
  }, {
    position: {
      x: 344,
      y: 135
    },
    prevPosition: {
      x: 344,
      y: 135
    },
    rotation: 0
  });
  return playerId;
}
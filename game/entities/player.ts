import { vec2 } from "~/utils/mathUtils";
import type { KeyboardControlled, Transform } from "../components";

function createPlayer(keybinds: KeyboardControlled['keybinds'], transform: Transform) {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.componentStore.sprites.add(id, { 
    textureName: "player" 
  });
  gameStore.componentStore.transforms.add(id, { 
    position: vec2(transform.position.x, transform.position.y),
    prevPosition: vec2(transform.position.x, transform.position.y),
    rotation: transform.rotation
  });
  gameStore.componentStore.rigidbodies.add(id, { 
    velocity: vec2(0, 0),
    speed: 10
  });
  gameStore.componentStore.keyboardControlled.add(id, { keybinds: keybinds});
  gameStore.componentStore.boxColliders.add(id, {
    size: {
      width: 8,
      height: 32
    },
    offset: {
      x: 4,
      y: 0,
    }
  });
  gameStore.componentStore.solid.add(id, {});
  gameStore.componentStore.reflectDirections.add(id, { direction: "X" });
  gameStore.componentStore.scores.add(id, { score: 0 });
  return id;
}

export function createPlayerOne(): number{
  const playerId = createPlayer({
    UP: 'w',
    DOWN: 's',
    PAUSE: 'Escape'
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
    DOWN: 'k',
    PAUSE: 'Escape'
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
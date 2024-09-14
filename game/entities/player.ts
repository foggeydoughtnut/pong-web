import { vec2 } from "~/utils/mathUtils";

export function createPlayer(): number{
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  gameStore.dataStore.sprites.set(id, { textureName: "blackBox" } );
  gameStore.dataStore.transforms.set(id, { position: vec2(250, 250), rotation: 0 });
  gameStore.dataStore.rigidbodies.set(id, { velocity: vec2(0, 0), speed: 100});
  gameStore.dataStore.keyboardControlled.set(id, {});
  return id;
}
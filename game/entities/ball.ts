import { vec2 } from "~/utils/mathUtils";

export function createBall(): number{
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.componentStore.sprites.add(id, { 
    textureName: "ball" 
  });
  gameStore.componentStore.transforms.add(id, { 
    position: vec2(180, 135),
    prevPosition: vec2(180, 135),
    rotation: 0
  });
  gameStore.componentStore.rigidbodies.add(id, { 
    velocity: vec2(-1, 0.5),
    speed: 100
  });
  gameStore.componentStore.boxColliders.add(id, {
    size: {
      width: 8,
      height: 8
    },
    offset: {
      x: 4,
      y: 4,
    }
  });
  gameStore.componentStore.solid.add(id, {});
  gameStore.componentStore.bounceable.add(id, {});
  gameStore.componentStore.balls.add(id, {});
  return id;
}
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
    },
    offset: {
      x: 0,
      y: 0,
    }
  });
  gameStore.dataStore.solid.add(id, {});
  gameStore.dataStore.statics.add(id, {});
  return id;
}

export const createRoof = (): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.sprites.add(id, { 
    textureName: "roof" 
  });
  gameStore.dataStore.transforms.add(id, { 
    position: vec2(0, -8),
    prevPosition: vec2(0, -8),
    rotation: 0
  });
  gameStore.dataStore.boxColliders.add(id, {
    size: {
      width: 360,
      height: 8
    },
    offset: {
      x: 0,
      y: 8,
    }
  });
  gameStore.dataStore.solid.add(id, {});
  gameStore.dataStore.statics.add(id, {});
  return id;
}

export const createFloor = (): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.sprites.add(id, { 
    textureName: "floor" 
  });
  gameStore.dataStore.transforms.add(id, { 
    position: vec2(0, 268),
    prevPosition: vec2(0, 268),
    rotation: 0
  });
  gameStore.dataStore.boxColliders.add(id, {
    size: {
      width: 360,
      height: 8
    },
    offset: {
      x: 0,
      y: 0,
    }
  });
  gameStore.dataStore.solid.add(id, {});
  gameStore.dataStore.statics.add(id, {});
  return id;
}

export const createBackground = (): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.sprites.add(id, { 
    textureName: "background" 
  });
  gameStore.dataStore.transforms.add(id, { 
    position: vec2(0, 0),
    prevPosition: vec2(0, 0),
    rotation: 0
  });
  return id;
}
export const createStaticBox = (): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.sprites.set(id, { 
    textureName: "blackBox" 
  });
  gameStore.dataStore.transforms.set(id, { 
    position: vec2(250, 250),
    rotation: 0
  });
  gameStore.dataStore.boxColliders.set(id, {
    size: {
      width: 16,
      height: 16
    }
  })
  return id;
}
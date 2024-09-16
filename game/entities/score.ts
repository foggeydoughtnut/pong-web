export const createScoreOne = (): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.gameTexts.add(id, {
    text: "0",
    fontFamily: "arial",
    size: 32,
    color: 'white'
  })
  gameStore.dataStore.transforms.add(id, { 
    position: vec2(90, 24),
    prevPosition: vec2(90, 24),
    rotation: 0
  });
  return id;
}

export const createScoreTwo = (): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  
  gameStore.dataStore.gameTexts.add(id, {
    text: "0",
    fontFamily: "arial",
    size: 32,
    color: 'white'
  })
  gameStore.dataStore.transforms.add(id, { 
    position: vec2(270, 24),
    prevPosition: vec2(270, 24),
    rotation: 0
  });
  return id;
}
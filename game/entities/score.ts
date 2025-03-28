import type { Vector2 } from "../components";

export const createScore = (position: Vector2, scoreId: number): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  

  gameStore.componentStore.gameTexts.add(id, {
    text: () => (gameStore.componentStore.scores.get(scoreId)?.score.toString() ?? "0"),
    fontFamily: "sans-serif",
    size: 32,
    color: 'white'
  })
  gameStore.componentStore.transforms.add(id, { 
    position: position,
    prevPosition: position,
    rotation: 0
  });
  return id;
}
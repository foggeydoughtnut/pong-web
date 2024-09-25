import type { Vector2 } from "../components";

export const createText = (position: Vector2, text: string, size: number): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  

  gameStore.componentStore.gameTexts.add(id, {
    text: () => text,
    fontFamily: "sans-serif",
    size: size,
    color: 'white'
  })
  gameStore.componentStore.transforms.add(id, {
    position: position,
    prevPosition: position,
    rotation: 0
  });

  return id;
}
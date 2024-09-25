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
  const MHeight = gameStore.canvasContext?.measureText("M").width ?? 0
  gameStore.componentStore.transforms.add(id, {
    position: { x: position.x - (gameStore.canvasContext?.measureText(text).width ?? 0)/2, y: position.y - MHeight/2 },
    prevPosition: { x: position.x - (gameStore.canvasContext?.measureText(text).width ?? 0)/2, y: position.y - MHeight/2 },
    rotation: 0
  });

  return id;
}
import type { Vector2 } from "../components";

export const createGameTimer = (position: Vector2, callback: () => void): number => {
  const gameStore = useGameStore();
  const id = gameStore.nextId();
  

  gameStore.componentStore.gameTexts.add(id, {
    text: () => (gameStore.componentStore.timers.get(id)?.remainingTime.toFixed(0) ?? "0"),
    fontFamily: "sans-serif",
    size: 32,
    color: 'white'
  })
  gameStore.componentStore.transforms.add(id, { 
    position: position,
    prevPosition: position,
    rotation: 0
  });
  gameStore.componentStore.timers.add(id, {
    remainingTime: 3,
    duration: 3,
    callback: callback
  });
  return id;
}
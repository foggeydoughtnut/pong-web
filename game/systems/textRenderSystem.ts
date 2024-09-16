import type { System } from "~/types";
export const textRenderSystem: System = {
  update(deltatime: number) {
  },
  draw: () => {
    const gameStore = useGameStore(useNuxtApp().$pinia);
    if (gameStore.canvasContext) {
      for (let [key, value] of  gameStore.dataStore.gameTexts.entries()) {
        const transform = gameStore.dataStore.transforms.get(key);
        if (transform) {
          gameStore.canvasContext.fillStyle = value.color;
          gameStore.canvasContext.font = `${value.size}px ${value.fontFamily}`
          gameStore.canvasContext.textRendering = "optimizeLegibility";
          gameStore.canvasContext.fillText(value.text, transform.position.x, transform.position.y + value.size/2)
        }
      }
    }
  }
}
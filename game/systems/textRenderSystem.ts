import type { System } from "~/types";
export const textRenderSystem: System = {
  systemName: "Text Render System",
  update(deltatime: number) {
  },
  draw: () => {
    const gameStore = useGameStore(useNuxtApp().$pinia);
    if (gameStore.canvasContext) {
      for (let [key, value] of  gameStore.componentStore.gameTexts.entries()) {
        const transform = gameStore.componentStore.transforms.get(key);
        if (transform) {

          const heightOfText = gameStore.canvasContext?.measureText("M").width ?? 0
          const widthOfText = gameStore.canvasContext?.measureText(value.text()).width ?? 0;

          gameStore.canvasContext.fillStyle = value.color;
          gameStore.canvasContext.font = `${value.size}px ${value.fontFamily}`
          gameStore.canvasContext.textRendering = "optimizeLegibility";
          gameStore.canvasContext.fillText(value.text(), transform.position.x - widthOfText/2, transform.position.y + heightOfText/2)
        }
      }
    }
  }
}
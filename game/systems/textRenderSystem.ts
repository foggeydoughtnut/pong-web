import type { System } from "~/types";
export const textRenderSystem: System = {
  systemName: "Text Render System",
  update(deltatime: number) {
  },
  draw: (context: CanvasRenderingContext2D) => {
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [key, value] of  gameStore.componentStore.gameTexts.entries()) {
      const transform = gameStore.componentStore.transforms.get(key);
      if (transform) {

        const heightOfText = context.measureText("M").width ?? 0
        const widthOfText = context.measureText(value.text()).width ?? 0;

        context.fillStyle = value.color;
        context.font = `${value.size}px ${value.fontFamily}`
        context.textRendering = "optimizeLegibility";
        context.fillText(value.text(), transform.position.x - widthOfText/2, transform.position.y + heightOfText/2)
        
      }
    }
    
  }
}
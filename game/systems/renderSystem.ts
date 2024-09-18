import type { System } from "~/types";
export const renderSystem: System = {
  systemName: "Render System",
  update(deltatime: number) {
  },
  draw: () => {
    const gameStore = useGameStore(useNuxtApp().$pinia);
    if (gameStore.canvasContext) {
      for (let [key, value] of  gameStore.componentStore.sprites.entries()) {
        const transform = gameStore.componentStore.transforms.get(key);
        if (transform) {
          const image = gameStore.loadedImages.get(value.textureName);
          if (image) {
            gameStore.canvasContext.drawImage(image, transform.position.x, transform.position.y);
          } else {
            console.error(`Image for value: ${value.textureName} didn't exist`);
          }
        }
      }
    }
  }
}
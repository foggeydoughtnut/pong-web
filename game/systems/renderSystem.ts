import type { System } from "~/types";
export const renderSystem: System = {
  systemName: "Render System",
  update(deltatime: number) {
  },
  draw: (context: CanvasRenderingContext2D) => {
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (let [key, value] of  gameStore.componentStore.sprites.entries()) {
      const transform = gameStore.componentStore.transforms.get(key);
      if (transform) {
        const image = gameStore.loadedImages.get(value.textureName);
        if (image) {
          context.drawImage(image, transform.position.x, transform.position.y);
        } else {
          console.error(`Image for value: ${value.textureName} didn't exist`);
        }
      }
    }
  }
}
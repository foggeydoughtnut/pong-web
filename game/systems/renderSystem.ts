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
          // If paused, only render the entities that have the pause element component attached to them
          if (gameStore.paused) {
            if (gameStore.componentStore.pauseElements.has(key)) {
              context.drawImage(image, transform.position.x, transform.position.y);
            }
          } else {
            context.drawImage(image, transform.position.x, transform.position.y);
          }
        } else {
          console.error(`Image for value: ${value.textureName} didn't exist`);
        }
      }
    }
  }
}
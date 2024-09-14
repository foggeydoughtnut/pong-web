import type { System } from "~/types";
export const renderSystem: System = {
  update(deltatime: number) {
  },
  draw: () => {
    const gameStore = useGameStore(useNuxtApp().$pinia);
    if (gameStore.canvasContext) {



    

      // gameStore.canvasContext.font = "12px Arial"

      
      for (let [key, value] of  gameStore.dataStore.sprites.entries()) {
        const transform = gameStore.dataStore.transforms.get(key);
        if (transform) {
          console.log(gameStore.loadedImages)
          const image = gameStore.loadedImages.get(value.textureName);
          if (image) {
            gameStore.canvasContext.drawImage(image, transform.position.x, transform.position.y);
          } else {
            console.error(`Image for value: ${value.textureName} didn't exist`);
            // TODO make a purple texture that it draws instead
          }
        } else {
          console.error("Missing transform on entity with id: ", key)
        }
      }
    }
  }
}
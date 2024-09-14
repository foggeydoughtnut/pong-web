import type { System } from "~/types";
export const renderSystem: System = {
  update(deltatime: number) {
  },
  draw: () => {
    // TODO: Extend the default map.get to make it so that is what handles returning the noTexture sprite when the textureName doesn't exist
    const gameStore = useGameStore(useNuxtApp().$pinia);
    if (gameStore.canvasContext) {
      for (let [key, value] of  gameStore.dataStore.sprites.entries()) {
        const transform = gameStore.dataStore.transforms.get(key);
        if (transform) {
          const image = gameStore.loadedImages.get(value.textureName);
          if (image) {
            gameStore.canvasContext.drawImage(image, transform.position.x, transform.position.y);
          } else {
            console.error(`Image for value: ${value.textureName} didn't exist`);
            const noTextureSprite = gameStore.loadedImages.get('noTexture');
            if (noTextureSprite) {
              gameStore.canvasContext.drawImage(noTextureSprite, transform.position.x, transform.position.y);
            } else {
              console.error(`noTexture sprite isn't loading correctly`);
            }
          }
        } else {
          console.error("Missing transform on entity with id: ", key)
        }
      }
    }
  }
}
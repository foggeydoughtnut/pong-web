import type { System } from "~/types";
export const renderSystem: System = {
  update(deltatime: number) {
  },
  draw: () => {
    const gameStore = useGameStore(useNuxtApp().$pinia);
    if (gameStore.canvasContext) {
      const spriteSheetURL = 'https://codehs.com/uploads/e4cfb06e001bd92cf41139928e88819a';
      const image = new Image();
      image.src = spriteSheetURL;


    

      gameStore.canvasContext.font = "12px Arial"

      
      for (let [key, value] of  gameStore.dataStore.sprites.entries()) {
        const transform = gameStore.dataStore.transforms.get(key);
        if (transform) {
          gameStore.canvasContext.fillText("testing", transform.position.x, transform.position.y);
        } else {
          console.error("Missing transform on entity with id: ", key)
        }
      }
    }
  }
}
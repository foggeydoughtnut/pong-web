export const loadImage = async (imageFileName: string, imageKey: string) => {
  if (import.meta.client) {
    const gameStore = useGameStore(useNuxtApp().$pinia);
    return new Promise( (resolve, reject) => {
      const image = new Image()
      image.src = imageFileName
      image.onload = () => {
        resolve(image);
        gameStore.loadedImages.set(imageKey, image);
      }
      image.onerror = () => reject(new Error('could not load image'))
    })
  }
}
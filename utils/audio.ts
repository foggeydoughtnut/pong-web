export const loadAudioFile = (src: string, name: string) => {
  const gameStore = useGameStore(useNuxtApp().$pinia);
  const sound = new Audio();
  sound.src = src;

  gameStore.loadedAudio.set(name, sound);
}

export const playSound = (audio: HTMLAudioElement) => {
  audio.play();
}
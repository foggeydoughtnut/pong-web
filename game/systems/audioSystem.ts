import type { System } from "~/types";
export const audioSystem: System = {
  systemName: "Audio System",
  update(deltatime: number) {
    const gameStore = useGameStore(useNuxtApp().$pinia);
    const logger = useLogStore(useNuxtApp().$pinia);
    for (let [key, name] of  gameStore.soundEffectEvents.entries()) {
      const soundEffectName = gameStore.soundEffectEvents.get(key);
      if (soundEffectName) {
        const audioFile = gameStore.loadedAudio.get(soundEffectName);
        if (audioFile) {
          playSound(audioFile)
        } else {
          logger.error(`Trying to play ${soundEffectName} which doesn't exist or isn't loaded`)
        }
      } else {
        logger.error(`Audio effect ${key} didn't exist in the sound effect events`);
      }
    }
  },
  draw: () => {}
}
import type { System } from "~/types";

export const buttonSystem: System = {
  systemName: "Button System",
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);
    for (const [key, button] of gameStore.componentStore.buttons.entries()){
      // Check if key is in the map of collisions
      const collisions = gameStore.uiCollidedEvents.get(key);
      if (collisions) {
        for (const collidedWithKey of collisions) {
          if (collidedWithKey !== key) {
            if (gameStore.clicked) {
              button.callback();
            }
          }
        }
      }
    }
  },
  draw(){
  }
}
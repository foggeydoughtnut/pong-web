import type { System } from "~/types";

export const buttonSystem: System = {
  systemName: "Button System",
  update(deltatime: number){
    const logger = useLogStore();
    const gameStore = useGameStore(useNuxtApp().$pinia);

    let isColliding = false;
    for (const [key, button] of gameStore.componentStore.buttons.entries()){
      // Check if key is in the map of collisions
      const collisions = gameStore.uiCollidedEvents.get(key);
      if (collisions) {
        for (const collidedWithKey of collisions) {
          if (collidedWithKey !== key) {
            isColliding = true;
            if (gameStore.clicked) {
              button.callback();
            }
          }
        }
      }
    }

    if (isColliding) {
      document.documentElement.style.cursor = 'pointer';
    } else {
      document.documentElement.style.cursor = 'default';
    }
  },
  draw(){
  }
}
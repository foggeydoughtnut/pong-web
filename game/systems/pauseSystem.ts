import type { System } from "~/types";
import { createBlankBackground, createCursor, createText } from "../entities";
import { createButton } from "../entities/button";

let previousPauseState = false;
let textId = -1;
let quitButtonId = -1;
let cursorId = -1;
let blankBackgroundId = -1;

const deleteEntities = () => {
  const gameStore = useGameStore(useNuxtApp().$pinia);

  gameStore.deleteEntity(blankBackgroundId, pauseSystem);
  gameStore.deleteEntity(textId, pauseSystem);
  gameStore.deleteEntity(quitButtonId, pauseSystem);
  gameStore.deleteEntity(cursorId, pauseSystem);

  previousPauseState = false;
  textId = -1;
  quitButtonId = -1;
  cursorId = -1;
  blankBackgroundId = -1;
}


export const pauseSystem: System = {
  systemName: "Pause System",
  update(deltatime: number) {
    const gameStore = useGameStore(useNuxtApp().$pinia);
    const logger = useLogStore(useNuxtApp().$pinia);

    if (gameStore.paused && !previousPauseState) {
      blankBackgroundId = createBlankBackground();
      textId = createText(
        vec2(gameStore.gameConfig.resolution.width/2, gameStore.gameConfig.resolution.height/3),
        "Paused",
        32
      );
    
      quitButtonId = createButton(
        vec2(gameStore.gameConfig.resolution.width/2, gameStore.gameConfig.resolution.height/3 + 40),
        "Quit",
        () => {
          deleteEntities();
          gameStore.paused = false;
          gameStore.queueSceneSwitch('main-menu');
        },
        { 
          size: {width: 64, height: 32},
          offset: { x: -36, y: -12 }
        }
      );
      cursorId = createCursor(gameStore.mousePosition, { size: { width: 16, height: 8 }, offset: { x: -4, y: -4 }})
    }

    if (!gameStore.paused && previousPauseState) {
      deleteEntities();
    }
    previousPauseState = gameStore.paused;
  },
  draw: () => {}
}
<script setup lang="ts">
import { mainGameScene, gameOverScene, mainMenuScene } from '~/game/scenes';
import { LogType } from "~/types"
import type { Scene } from '~/types';

let lastFrameTimeMs = 0;
const gameStore = useGameStore();
const logStore = useLogStore();

const gameCanvas = ref<HTMLCanvasElement | undefined>()
const pauseCanvas = ref<HTMLCanvasElement | undefined>()

function keydown(ev: KeyboardEvent){
  gameStore.pressedKeys.add(ev.key);
}
function keyup(ev: KeyboardEvent){
  gameStore.pressedKeys.delete(ev.key);
}



function getMousePos(canvas: HTMLCanvasElement | undefined, evt: MouseEvent) {
  if (canvas) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
  } else {
    return {
      x: 0,
      y: 0
    }
  }
}

const onMouseMove = (event: MouseEvent) => {
  let mousePos = {x: 0, y: 0};
  if (gameStore.paused) {
    mousePos = getMousePos(pauseCanvas.value, event);
  } else {
    mousePos = getMousePos(gameCanvas.value, event);
  }
  gameStore.mousePosition.x = mousePos.x;
  gameStore.mousePosition.y = mousePos.y;
}

const onClickHandler = (event: MouseEvent) => {
  gameStore.clicked = true;
}

const initialize = async () => {
  gameStore.addScene('main-menu', mainMenuScene);
  gameStore.addScene('main-game', mainGameScene);
  gameStore.addScene('game-over', gameOverScene);

  // Make canvas context available globally
  if (gameCanvas.value) {
    const ctx = gameCanvas.value.getContext('2d');
    if (ctx) {
      gameStore.mainGameContext = ctx;
    }
  }

  if (pauseCanvas.value) {
    const ctx = pauseCanvas.value.getContext('2d');
    if (ctx) {
      gameStore.pauseContext = ctx;
    }
  }

  window.onkeydown = keydown;
  window.onkeyup = keyup;
  

  await loadImage('/sprites/blackBox.png', 'blackBox');
  await loadImage('/sprites/testingSmallerSprite.png', 'testingSmallerSprite');
  await loadImage('/sprites/background.png', 'background');
  await loadImage('/sprites/Ball.png', 'ball');
  await loadImage('/sprites/Floor.png', 'floor');
  await loadImage('/sprites/Roof.png', 'roof');
  await loadImage('/sprites/Player.png', 'player');
  await loadImage('/sprites/blankBackground.png', 'blankBackground');

  loadAudioFile('/audio/playerBounce.ogg', 'playerBounce');
  loadAudioFile('/audio/score.ogg', 'score');
  loadAudioFile('/audio/wallBounce.ogg', 'wallBounce');

  const scene = gameStore.scenes.get(gameStore.currentSceneName);
  if (scene) {
    scene.createEntities();
  } else {
    logStore.error(`Scene ${gameStore.currentSceneName} does not exist`)
  }

  requestAnimationFrame(mainLoop);
}

const removeData = () => {
  for (const componentStore of Object.values(gameStore.componentStore)) {
    componentStore.clear();
  }
}

const handleInput = (deltaTime: number, scene: Scene) => {
  scene.handleInput(deltaTime);
}

const update = (deltaTime: number) => {
  if (!gameStore.mainGameContext) {
    if (gameCanvas.value) {
      const ctx = gameCanvas.value.getContext('2d');
      if (ctx) {
        gameStore.mainGameContext = ctx;
        gameStore.activeContext = gameStore.mainGameContext;

      }
    }
  }

  if (!gameStore.pauseContext) {
    if (pauseCanvas.value) {
      const ctx = pauseCanvas.value.getContext('2d');
      if (ctx) {
        gameStore.pauseContext = ctx;
      }
    }
  }
  
  for (const newSceneName of gameStore.sceneSwitchQueue) {
    if (newSceneName !== gameStore.currentSceneName) {
      gameStore.currentSceneName = newSceneName;
      const newScene = gameStore.scenes.get(newSceneName);
      if (newScene) {
        gameStore.sceneSwitchQueue.delete(newSceneName)
        removeData();
        newScene.createEntities();
        document.documentElement.style.cursor = 'default';
      } else {
        logStore.error(`Scene ${newSceneName} does not exist`)
      }
    }
  }

  const scene = gameStore.scenes.get(gameStore.currentSceneName);
  if (scene) {
    handleInput(deltaTime, scene);
    scene.update(deltaTime);
  } else {
    logStore.error(`Scene ${gameStore.currentSceneName} does not exist`)
  }
}


const render = () => {
  if (gameCanvas.value && gameStore.activeContext) {
    gameStore.activeContext.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);
  }
  const scene = gameStore.scenes.get(gameStore.currentSceneName);
  if (scene) {
    if (gameStore.activeContext) {
      scene.render(gameStore.activeContext);
    }
  } else {
    logStore.error(`Scene ${gameStore.currentSceneName} does not exist`)
  }
}


const cleanup = () => {
  gameStore.collidedEvents.clear();
  gameStore.uiCollidedEvents.clear();
  gameStore.soundEffectEvents.clear();
  gameStore.clicked = false;
  for (const removeKey of gameStore.deletionQueue) {
    for (const system of Object.values(gameStore.componentStore)){
      system.delete(removeKey);
    }
  }
}

const mainLoop = (timestamp: number) => {
  const deltaTime = (timestamp - lastFrameTimeMs) / 1000; // get the delta time since last frame in seconds
  lastFrameTimeMs = timestamp;
  update(deltaTime);
  render();
  cleanup();
  requestAnimationFrame(mainLoop);
}

onMounted(async () => {
  await initialize();
})

</script>


<template>
  <div>
    <ClientOnly>
      <div class="grid grid-rows-[auto_1fr] gap-4 overflow-hidden p-8 h-full w-full">
        <div class="grid place-items-center justify-center items-center">
          <canvas v-show="!gameStore.paused" class="border" ref="gameCanvas" :width="gameStore.gameConfig.resolution.width" :height="gameStore.gameConfig.resolution.height" @mousemove="onMouseMove" @click="onClickHandler"/>
          <canvas v-show="gameStore.paused" class="border" ref="pauseCanvas" :width="gameStore.gameConfig.resolution.width" :height="gameStore.gameConfig.resolution.height" @mousemove="onMouseMove" @click="onClickHandler"/>
        </div>
        <div class="m-4 w-full h-full flex flex-col overflow-auto bg-white border rounded-md">
          <div v-for="log in logStore.getLogs(LogType.Info)" :key="log.message" class="p-4">
            <div
              v-if="log.logType == LogType.Error"
            >
              <p class="text-red-500">
                ERROR: {{ log.message }}
              </p>
            </div>
            <div 
              v-else-if="log.logType == LogType.Warn"
            >
              <p class="text-yellow-500">
                WARNING: {{ log.message }}
              </p>
            </div>
            <div 
              v-else-if="log.logType == LogType.Debug" 
            >
              <p class="text-green-500">DEBUG: {{ log.message }}</p>
            </div>
            <div 
              v-else
            >
              <p class="text-gray-900">INFO: {{ log.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
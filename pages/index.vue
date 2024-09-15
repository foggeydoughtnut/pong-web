<script setup lang="ts">
import { createBackground, createBall, createFloor, createPlayerOne, createPlayerTwo, createRoof, createStaticBox } from '~/game/entities';
import { renderSystem, physicSystem, collisionSystem, inputSystem, solidSystem, bouncingSystem } from '~/game/systems';
import { LogType } from "~/types"

const DEBUG = true;

let lastFrameTimeMs = 0;

const gameStore = useGameStore();
const logStore = useLogStore();


const gameCanvas = ref<HTMLCanvasElement | undefined>()

function keydown(ev: KeyboardEvent){
  gameStore.pressedKeys.add(ev.key);
}
function keyup(ev: KeyboardEvent){
  gameStore.pressedKeys.delete(ev.key);
}

const initialize = async () => {
  // Make canvas context available globally
  if (gameCanvas.value) {
    const ctx = gameCanvas.value.getContext('2d');
    if (ctx) {
      gameStore.canvasContext = ctx;
    }
  }

  window.onkeydown = keydown;
  window.onkeyup = keyup;

  await loadImage('blackBox.png', 'blackBox');
  await loadImage('testingSmallerSprite.png', 'testingSmallerSprite');
  await loadImage('background.png', 'background');
  await loadImage('Ball.png', 'ball');
  await loadImage('Floor.png', 'floor');
  await loadImage('Roof.png', 'roof');
  await loadImage('Player.png', 'player')


  createBackground();
  createFloor();
  createRoof();
  createPlayerOne();
  createPlayerTwo();
  createBall();


  requestAnimationFrame(mainLoop);
}

const update = (deltaTime: number) => {
  if (!gameStore.canvasContext) {
    if (gameCanvas.value) {
      const ctx = gameCanvas.value.getContext('2d');
      if (ctx) {
        gameStore.canvasContext = ctx;
      }
    }
  }
  inputSystem.update(deltaTime);
  physicSystem.update(deltaTime);
  collisionSystem.update(deltaTime);
  solidSystem.update(deltaTime);
  bouncingSystem.update(deltaTime);
}


const render = () => {
  if (gameCanvas.value && gameStore.canvasContext) {
    gameStore.canvasContext.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);
  }

  renderSystem.draw();
  if (DEBUG) {
    collisionSystem.draw();
  }
}

const cleanup = () => {
  gameStore.collidedEvents.clear();
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
      <div class="grid grid-rows-3 overflow-hidden p-8 h-full w-full">
        <div class="grid row-span-2 w-3/4">
          <canvas class="border w-full h-full" ref="gameCanvas" :width="360" :height="270" />
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
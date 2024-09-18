<script setup lang="ts">
import type { ComponentMap } from '#imports';
import { createBackground, createBall, createFloor, createGoal, createPlayerOne, createPlayerTwo, createRoof, createScore, createStaticBox } from '~/game/entities';
import { renderSystem, physicSystem, collisionSystem, inputSystem, solidSystem, bouncingSystem, audioSystem, textRenderSystem, goalSystem } from '~/game/systems';
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

  await loadImage('/sprites/blackBox.png', 'blackBox');
  await loadImage('/sprites/testingSmallerSprite.png', 'testingSmallerSprite');
  await loadImage('/sprites/background.png', 'background');
  await loadImage('/sprites/Ball.png', 'ball');
  await loadImage('/sprites/Floor.png', 'floor');
  await loadImage('/sprites/Roof.png', 'roof');
  await loadImage('/sprites/Player.png', 'player')

  loadAudioFile('/audio/playerBounce.ogg', 'playerBounce');
  loadAudioFile('/audio/score.ogg', 'score');
  loadAudioFile('/audio/wallBounce.ogg', 'wallBounce');

  createBackground();
  createFloor();
  createRoof();
  createBall();

  const playerOneId = createPlayerOne();
  const playerTwoId = createPlayerTwo();

  createScore(vec2(80, 24), playerOneId);
  createScore(vec2(270, 24), playerTwoId);
  createGoal(vec2(360, 0), playerOneId);
  createGoal(vec2(-16, 0), playerTwoId);


  requestAnimationFrame(mainLoop);
}

const handleInput = (deltaTime: number) => {
  inputSystem.update(deltaTime);
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
  handleInput(deltaTime);

  physicSystem.update(deltaTime);
  collisionSystem.update(deltaTime);
  solidSystem.update(deltaTime);
  bouncingSystem.update(deltaTime);
  goalSystem.update(deltaTime);
  audioSystem.update(deltaTime);
}


const render = () => {
  if (gameCanvas.value && gameStore.canvasContext) {
    gameStore.canvasContext.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);
  }

  renderSystem.draw();
  textRenderSystem.draw();
  if (DEBUG) {
    collisionSystem.draw();
  }
}

const cleanup = () => {
  gameStore.collidedEvents.clear();
  gameStore.soundEffectEvents.clear();
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
          <canvas class="border" ref="gameCanvas" :width="360" :height="270" />
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
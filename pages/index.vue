<script setup lang="ts">
import { renderSystem } from '~/game/systems';
import type { Position } from '~/types';

let lastFrameTimeMs = 0;

const gameStore = useGameStore();



const gameCanvas = ref<HTMLCanvasElement | undefined>()

const testPos: Position = {
  x: 50,
  y: 50
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

  testPos.x += 10 * deltaTime;
}

const playerFactory = () => {
  const id = gameStore.nextId();
  gameStore.dataStore.sprites.set(id, { textureName: "blackBox"} );
  gameStore.dataStore.transforms.set(id, { position: { x: 250, y: 250 }, rotation: 0 });
}


const initialize = async () => {
  // Make canvas context available globally
  if (gameCanvas.value) {
    const ctx = gameCanvas.value.getContext('2d');
    if (ctx) {
      gameStore.canvasContext = ctx;
    }
  }

  await loadImage('blackBox.png', 'blackBox');
  playerFactory()



  requestAnimationFrame(mainLoop);
}

const render = () => {
  if (gameCanvas.value && gameStore.canvasContext) {
    gameStore.canvasContext.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);
  }

  renderSystem.draw();
}

const mainLoop = (timestamp: number) => {
  const deltaTime = (timestamp - lastFrameTimeMs) / 1000; // get the delta time since last frame in seconds
  lastFrameTimeMs = timestamp;
  update(deltaTime);
  render();
  requestAnimationFrame(mainLoop);
}

onMounted(async () => {
  await initialize();
})

</script>


<template>
  <div>
    <ClientOnly>
      <canvas ref="gameCanvas" :width="500" :height="500" />
    </ClientOnly>
  </div>
</template>
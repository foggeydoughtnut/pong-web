<script setup lang="ts">
import type { Position } from '~/types';


let lastFrameTimeMs = 0;

const gameCanvas = ref<HTMLCanvasElement>()

const testPos: Position = {
  x: 50,
  y: 50
}

const update = (deltaTime: number) => {
  testPos.x += 10 * deltaTime;
}

const render = () => {
  if (gameCanvas.value) {
    const ctx = gameCanvas.value.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);

      ctx.font = "12px serif";
      ctx.fillText("Testing", testPos.x, testPos.y);
    }
  }
}

const mainLoop = (timestamp: number) => {
  const deltaTime = (timestamp - lastFrameTimeMs) / 1000; // get the delta time since last frame in seconds
  lastFrameTimeMs = timestamp;

  update(deltaTime);
  render();
  requestAnimationFrame(mainLoop);
}

onMounted(() => {
  requestAnimationFrame(mainLoop);
})

</script>


<template>
  <div>
    <canvas ref="gameCanvas" :width="500" :height="500" />
  </div>
</template>
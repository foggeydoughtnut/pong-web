import type { System } from "~/types";
import { vec2 } from "~/utils/mathUtils";

export const inputSystem: System = {
  systemName: "Input System",
  update(deltatime) {
    const gameStore = useGameStore();
    for (const [id, controls] of gameStore.componentStore.keyboardControlled.entries()){

      if (gameStore.pressedKeys.has(controls.keybinds.PAUSE)) {
        if (gameStore.paused) {
          gameStore.paused = false;
        } else {
          gameStore.paused = true;
        }
        gameStore.pressedKeys.delete(controls.keybinds.PAUSE);
      }

      const rigidbody = gameStore.componentStore.rigidbodies.get(id);
      if (rigidbody){

        let xvel = 0;

        let yvel = 0;
        if (gameStore.pressedKeys.has(controls.keybinds.UP)) {
          yvel -= 1;
        }
        if (gameStore.pressedKeys.has(controls.keybinds.DOWN)) {
          yvel += 1;
        }

        const vel = Vec2.multiply(Vec2.norm(vec2(xvel, yvel)), rigidbody.speed);

        gameStore.componentStore.rigidbodies.update(id, (prevVal) => ({speed: prevVal.speed, velocity: vel}));

      }
    }
  },
  draw() {},
}
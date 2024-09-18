import type { System } from "~/types";
import { vec2 } from "~/utils/mathUtils";

export const inputSystem: System = {
  systemName: "Input System",
  update(deltatime) {
    const gamestore = useGameStore();
    for (const [id, controls] of gamestore.componentStore.keyboardControlled.entries()){
      const rigidbody = gamestore.componentStore.rigidbodies.get(id);
      if (rigidbody){

        let xvel = 0;

        let yvel = 0;
        if (gamestore.pressedKeys.has(controls.keybinds.UP)) {
          yvel -= 1;
        }
        if (gamestore.pressedKeys.has(controls.keybinds.DOWN)) {
          yvel += 1;
        }

        const vel = Vec2.multiply(Vec2.norm(vec2(xvel, yvel)), rigidbody.speed);

        gamestore.componentStore.rigidbodies.update(id, (prevVal) => ({speed: prevVal.speed, velocity: vel}));

      }
    }
  },
  draw() {},
}
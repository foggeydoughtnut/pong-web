import type { System } from "~/types";
import { vec2 } from "~/utils/mathUtils";

export const inputSystem: System = {
  update(deltatime) {
    const gamestore = useGameStore();

    let yvel = 0;
    if (gamestore.pressedKeys.has('w')) {
      yvel -= 1;
    }
    if (gamestore.pressedKeys.has('s')) {
      yvel += 1;
    }
    
    let xvel = 0;
    if (gamestore.pressedKeys.has('a')){
      xvel -= 1;
    }
    if (gamestore.pressedKeys.has('d')){
      xvel += 1;
    }
    
    
    
    for (const id of gamestore.dataStore.keyboardControlled.keys()){
      const rigidbody = gamestore.dataStore.rigidbodies.get(id);
      if (rigidbody){
        const vel = Vec2.multiply(Vec2.norm(vec2(xvel, yvel)), rigidbody.speed);

        gamestore.dataStore.rigidbodies.update(id, (prevVal) => ({speed: prevVal.speed, velocity: vel}));

      }
    }
  },
  draw() {},
}
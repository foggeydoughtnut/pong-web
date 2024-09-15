import type { DataStore, CollisionEvent } from "~/types"
import { defineStore } from 'pinia'
import { ImageMap } from "~/utils";

type GameStoreState = {
  dataStore: DataStore;
  canvasContext: CanvasRenderingContext2D | null;
  loadedImages: ImageMap,
  pressedKeys: Set<KeyboardEvent['key']>,
  collidedEvents: Map<number, number[]>
}

export const useGameStore = defineStore('game', {
  state: (): GameStoreState => ({
    dataStore: {
      currentId: 0,
      sprites: new ComponentMap(),
      transforms: new ComponentMap(),
      rigidbodies: new ComponentMap(),
      keyboardControlled: new ComponentMap(),
      boxColliders: new ComponentMap(),
      solid: new ComponentMap(),
      statics: new ComponentMap(),
      bounceable: new ComponentMap()
    },
    canvasContext: null,
    loadedImages: new ImageMap(),
    pressedKeys: new Set(),
    collidedEvents: new Map(),
  }),
  getters: {},
  actions: {
    nextId(){
      return ++this.dataStore.currentId
    },
    addCollisionEvent(entity1: number, entity2: number){
      if (!this.collidedEvents.has(entity1)){
        this.collidedEvents.set(entity1, []);
      }
      this.collidedEvents.get(entity1)?.push(entity2);
      if (!this.collidedEvents.has(entity2)){
        this.collidedEvents.set(entity2, []);
      }
      this.collidedEvents.get(entity2)?.push(entity1);
    },
  },
})
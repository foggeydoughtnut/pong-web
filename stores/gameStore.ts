import type { CollisionEvent, DataStore } from "~/types"
import { defineStore } from 'pinia'
import { ImageMap } from "~/utils";

type GameStoreState = {
  dataStore: DataStore;
  canvasContext: CanvasRenderingContext2D | null;
  loadedImages: ImageMap,
  pressedKeys: Set<KeyboardEvent['key']>,
  collidedEvents: Set<CollisionEvent>
}

export const useGameStore = defineStore('game', {
  state: (): GameStoreState => ({
    dataStore: {
      currentId: 0,
      sprites: new Map(),
      transforms: new Map(),
      rigidbodies: new Map(),
      keyboardControlled: new Map(),
      boxColliders: new Map(),
    },
    canvasContext: null,
    loadedImages: new ImageMap(),
    pressedKeys: new Set(),
    collidedEvents: new Set(),
  }),
  getters: {},
  actions: {
    nextId(){
      return ++this.dataStore.currentId
    }
  },
})
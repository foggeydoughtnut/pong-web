import type { DataStore } from "~/types"
import { defineStore } from 'pinia'
import { ImageMap } from "~/utils";

type GameStoreState = {
  dataStore: DataStore;
  canvasContext: CanvasRenderingContext2D | null;
  loadedImages: ImageMap,
  pressedKeys: Set<KeyboardEvent['key']>,
}

export const useGameStore = defineStore('game', {
  state: (): GameStoreState => ({
    dataStore: {
      currentId: 0,
      sprites: new Map(),
      transforms: new Map(),
      rigidbodies: new Map(),
      keyboardControlled: new Map(),
    },
    canvasContext: null,
    loadedImages: new ImageMap(),
    pressedKeys: new Set(),
  }),
  getters: {},
  actions: {
    nextId(){
      return ++this.dataStore.currentId
    }
  },
})
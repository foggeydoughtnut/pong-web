import type { DataStore } from "~/types"
import { defineStore } from 'pinia'
import { ImageMap } from "~/utils";

type GameStoreState = {
  dataStore: DataStore;
  canvasContext: CanvasRenderingContext2D | null;
  loadedImages: ImageMap
}

export const useGameStore = defineStore('game', {
  state: (): GameStoreState => ({
    dataStore: {
      currentId: 0,
      sprites: new Map(),
      transforms: new Map()
    },
    canvasContext: null,
    loadedImages: new ImageMap(),
  }),
  getters: {},
  actions: {
    nextId(){
      return ++this.dataStore.currentId
    }
  },
})
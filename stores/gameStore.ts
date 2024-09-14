import type { DataStore } from "~/types"
import { defineStore } from 'pinia'

type GameStoreState = {
  dataStore: DataStore;
  canvasContext: CanvasRenderingContext2D | null;
}

export const useGameStore = defineStore('game', {
  state: (): GameStoreState => ({
    dataStore: {
      currentId: 0,
      sprites: new Map(),
      transforms: new Map()
    },
    canvasContext: null
  }),
  getters: {},
  actions: {
    nextId(){
      // this.dataStore.currentId += 1;
      // return this.dataStore.currentId;
      return ++this.dataStore.currentId
    }
  },
})
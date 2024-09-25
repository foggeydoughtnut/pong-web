import type { ComponentStore, CollisionEvent, System, Scene, ScenesAvailable, GameConfig } from "~/types"
import { defineStore } from 'pinia'
import { ImageMap } from "~/utils";

type GameStoreState = {
  componentStore: ComponentStore;
  canvasContext: CanvasRenderingContext2D | null;
  audioContext: AudioContext;
  loadedImages: ImageMap,
  loadedAudio: Map<string, HTMLAudioElement>
  pressedKeys: Set<KeyboardEvent['key']>,
  collidedEvents: Map<number, Set<number>>
  soundEffectEvents: Map<number, string>,
  deletionQueue: Set<number>,
  currentId: number,
  currentSceneName: ScenesAvailable;
  sceneSwitchQueue: Set<ScenesAvailable>
  scenes: Map<string, Scene>
  gameConfig: GameConfig;
}

export const useGameStore = defineStore('game', {
  state: (): GameStoreState => ({
    componentStore: {
      sprites: new ComponentMap(),
      transforms: new ComponentMap(),
      rigidbodies: new ComponentMap(),
      keyboardControlled: new ComponentMap(),
      boxColliders: new ComponentMap(),
      solid: new ComponentMap(),
      statics: new ComponentMap(),
      bounceable: new ComponentMap(),
      reflectDirections: new ComponentMap(),
      gameTexts: new ComponentMap(),
      scores: new ComponentMap(),
      goals: new ComponentMap(),
      balls: new ComponentMap(),
      timers: new ComponentMap(),
    },
    canvasContext: null,
    audioContext: new AudioContext(),
    loadedImages: new ImageMap(),
    pressedKeys: new Set(),
    collidedEvents: new Map(),
    loadedAudio: new Map(),
    soundEffectEvents: new Map(),
    deletionQueue: new Set(),
    sceneSwitchQueue: new Set(),
    currentId: 0,
    currentSceneName: "main-game",
    scenes: new Map(),
    gameConfig: {
      resolution: { width: 360, height: 270 },
      scoreToWin: 11
    }
  }),
  getters: {},
  actions: {
    nextId(){
      return ++this.currentId
    },
    addCollisionEvent(entity1: number, entity2: number){
      if (!this.collidedEvents.has(entity1)){
        this.collidedEvents.set(entity1, new Set());
      }
      this.collidedEvents.get(entity1)?.add(entity2);
      if (!this.collidedEvents.has(entity2)){
        this.collidedEvents.set(entity2, new Set());
      }
      this.collidedEvents.get(entity2)?.add(entity1);
    },
    addSoundEffectEvent(entity1: number, name: string) {
      this.soundEffectEvents.set(entity1, name);
    },
    deleteEntity(entity: number, removingSystem: System){
      const logger = useLogStore();
      logger.debug(`System ${removingSystem.systemName} is removing entity ${entity}`);
      this.deletionQueue.add(entity);
    },
    queueSceneSwitch(name: ScenesAvailable) {
      this.sceneSwitchQueue.add(name);
    },
    addScene(name: string, scene: Scene) {
      this.scenes.set(name, scene);
    }
  },
})
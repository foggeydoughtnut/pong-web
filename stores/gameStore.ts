import type { ComponentStore, CollisionEvent, System, Scene, ScenesAvailable, GameConfig } from "~/types"
import { defineStore } from 'pinia'
import { ImageMap } from "~/utils";

type GameStoreState = {
  componentStore: ComponentStore;
  mainGameContext: CanvasRenderingContext2D | null;
  pauseContext: CanvasRenderingContext2D | null;
  activeContext: CanvasRenderingContext2D | null;  
  loadedImages: ImageMap,
  loadedAudio: Map<string, HTMLAudioElement>
  pressedKeys: Set<KeyboardEvent['key']>,
  clicked: boolean,
  collidedEvents: Map<number, Set<number>>
  uiCollidedEvents: Map<number, Set<number>>,
  soundEffectEvents: Map<number, string>,
  deletionQueue: Set<number>,
  currentId: number,
  currentSceneName: ScenesAvailable;
  sceneSwitchQueue: Set<ScenesAvailable>
  scenes: Map<string, Scene>
  gameConfig: GameConfig;
  mousePosition: { x: number; y: number; };
  paused: boolean;
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
      buttons: new ComponentMap(),
      uiBoxColliders: new ComponentMap(),
      cursors: new ComponentMap(),
      pauseElements: new ComponentMap(),
    },
    mainGameContext: null,
    pauseContext: null,
    activeContext: null,
    loadedImages: new ImageMap(),
    pressedKeys: new Set(),
    collidedEvents: new Map(),
    uiCollidedEvents: new Map(),
    loadedAudio: new Map(),
    soundEffectEvents: new Map(),
    deletionQueue: new Set(),
    sceneSwitchQueue: new Set(),
    currentId: 0,
    currentSceneName: "main-menu",
    scenes: new Map(),
    gameConfig: {
      resolution: { width: 360, height: 270 },
      scoreToWin: 11
    },
    mousePosition: { x: 0, y: 0 },
    clicked: false,
    paused: false,
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
    },
    addUiCollisionEvent(entity1: number, entity2: number){
      if (!this.uiCollidedEvents.has(entity1)){
        this.uiCollidedEvents.set(entity1, new Set());
      }
      this.uiCollidedEvents.get(entity1)?.add(entity2);
      if (!this.uiCollidedEvents.has(entity2)){
        this.uiCollidedEvents.set(entity2, new Set());
      }
      this.uiCollidedEvents.get(entity2)?.add(entity1);
    },
  },
})
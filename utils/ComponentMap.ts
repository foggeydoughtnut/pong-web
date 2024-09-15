export class ComponentMap<T>{
  internalMap: Map<number, T>
  constructor(){
    this.internalMap = new Map();
  }

  add(key: number, val: T): boolean {
    if (this.internalMap.has(key))
      return false;
    this.internalMap.set(key, val);
    return true;
  }

  update(key: number, updateFunc: (previousValue: T) => T): boolean {
    const prevVal = this.internalMap.get(key);
    if (prevVal){
      this.internalMap.set(key, updateFunc(prevVal));
      return true;
    }
    const logger = useLogStore();
    logger.warn(`Tried to update a component that didn't exist for entity: ${key}`);
    return false;
  }

  has(key: number): boolean {
    return this.internalMap.has(key);
  }

  get(key: number): T | undefined {
    return this.internalMap.get(key);
  }

  delete(key: number): boolean {
    return this.internalMap.delete(key);
  }

  entries(){
    return this.internalMap.entries();
  }

  keys(){
    return this.internalMap.keys();
  }
}
export class ImageMap {

  defaultImage: HTMLImageElement
  internalMap: Map<string, HTMLImageElement>

  constructor() {
    this.defaultImage = new Image();
    const imageFileName = 'noTexture.png'
    this.defaultImage.src = imageFileName;
    this.internalMap = new Map()
  }
  get(key: string) {
    const image = this.internalMap.get(key);
    if (image) {
      return image
    } else {
      console.error(`Failed to load texture for ${key}. Returning default.`)
      return this.defaultImage;
    }
  }
  set(key: string, value: HTMLImageElement) {
    this.internalMap.set(key, value);
  }
  has(key: string) {
    return this.internalMap.has(key);
  }
}
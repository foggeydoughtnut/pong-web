export function RandomEventFunction<T>(threshold: number, option1: () => T, option2: () => T): T {
  if (Math.random() > threshold) {
    return option1()
  }
  return option2()
}

export function RandomEvent<T>(threshold: number, option1: T, option2: T): T {
  if (Math.random() > threshold) {
    return option1;
  }
  return option2;
}
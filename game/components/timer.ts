export type Timer = {
  duration: number;
  remainingTime: number;
  callback: () => void;
}
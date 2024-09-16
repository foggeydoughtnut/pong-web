export type GameText = {
  text: (() => string);
  size: number;
  color: string;
  fontFamily: string;
}
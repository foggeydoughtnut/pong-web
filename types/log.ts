
export enum LogType {
  Error = 0,
  Warn = 1,
  Debug = 2,
  Info = 3
}

export type Log = {
  message: string,
  logType: LogType
}
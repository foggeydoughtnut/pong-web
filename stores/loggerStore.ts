import { LogType, type Log } from "~/types"
import { defineStore } from 'pinia'

type LogState = {
  singleLogs: Set<string>,
  logs: Log[],
}

export const useLogStore = defineStore('log', {
  state: (): LogState => ({
    logs: [],
    singleLogs: new Set(),
  }),
  getters: {
  },
  actions: {
    log(message: string, logLevel: LogType){
      this.logs.push({ message, logType: logLevel });
    },
    logWithKey(message: string, logLevel: LogType, key: string){
      if (!this.singleLogs.has(key)){
        this.log(message, logLevel);
        this.singleLogs.add(key);
      }
    },
    error(message: string, key: string | null = null){
      if (key){
        this.logWithKey(message, LogType.Error, key);
      } else {
        this.log(message, LogType.Error);
      }
    },
    warn(message: string, key: string | null = null){
      if (key){
        this.logWithKey(message, LogType.Warn, key);
      } else {
        this.log(message, LogType.Warn);
      }
    },
    debug(message: string, key: string | null = null){
      if (key){
        this.logWithKey(message, LogType.Debug, key);
      } else {
        this.log(message, LogType.Debug);
      }
    },
    info(message: string, key: string | null = null){
      if (key){
        this.logWithKey(message, LogType.Info, key);
      } else {
        this.log(message, LogType.Info);
      }
    },
    getLogs(logLevel: LogType): Log[]{
      return this.logs.filter(log => log.logType <= logLevel);
    }
  },
})
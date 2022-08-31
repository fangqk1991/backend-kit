import { WecomProxy } from './WecomProxy'
import { _FangchaState } from '../main'

export class WecomHelper {
  public static makeWecomProxy(botKey: string) {
    const proxy = new WecomProxy({})
    if (!['staging', 'production'].includes(_FangchaState.env)) {
      proxy.setMuteMode(true)
    }
    proxy.setTag(_FangchaState.env)
    proxy.setRetainedBotKey(botKey)
    return proxy
  }
}

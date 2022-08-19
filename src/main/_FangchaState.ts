import { WecomProxy } from '../alert'

class __FangchaState {
  appName: string = ''

  env: string = 'development'
  tags: string[] = []

  botProxy: WecomProxy = new WecomProxy({})
}

export const _FangchaState = new __FangchaState()

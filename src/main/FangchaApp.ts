import { AppProtocol } from '../basic'
import { _FangchaState } from './_FangchaState'
import { WecomProxy } from '../alert'
import { CustomRequestFollower } from './CustomRequestFollower'
import { initLoggerForApp } from '@fangcha/logger'

export class FangchaApp {
  public protocol: AppProtocol

  public constructor(protocol: AppProtocol) {
    this.protocol = protocol
  }

  public async launch() {
    initLoggerForApp(this.protocol.appName)

    if (this.protocol.wecomBotKey) {
      const proxy = new WecomProxy({})
      if (!['staging', 'production'].includes(this.protocol.env)) {
        proxy.setMuteMode(true)
      }
      proxy.setTag(this.protocol.env)
      proxy.setRetainedBotKey(this.protocol.wecomBotKey)
      proxy.setAppName(this.protocol.appName)
      _FangchaState.botProxy = proxy
      CustomRequestFollower.botProxy = proxy
    }

    // _TinyApp.baseURL = this.protocol.baseURL || ''
    // if (this.protocol.jwtProtocol) {
    //   _TinyApp.setJWTProtocol(this.protocol.jwtProtocol)
    // }

    const appDidLoad = this.protocol.appDidLoad || (async () => {})
    await appDidLoad().catch((err) => {
      console.error(err)
      if (this.protocol.onLaunchError) {
        this.protocol.onLaunchError(err)
      }
      throw err
    })

    const plugins = this.protocol.plugins || []
    for (const plugin of plugins) {
      await plugin.appDidLoad(this.protocol)
    }

    if (this.protocol.checkHealth) {
      await this.protocol.checkHealth()
    }
  }
}

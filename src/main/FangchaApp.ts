import { AppProtocol } from '../basic'

export class FangchaApp {
  public protocol: AppProtocol

  public constructor(protocol: AppProtocol) {
    this.protocol = protocol
  }

  public async launch() {
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

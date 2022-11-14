import { FangchaApp } from '../main'
import { AppProtocol } from '../basic'
import { HealthDocItem } from './retained-specs/HealthSpecs'
import { KitProfileSpecDocItem } from '../profile'
import { _RouterState } from './_RouterState'
import { RouterSdkOptions } from './RouterSdkOptions'
import { RouterSdkPlugin } from './RouterSdkPlugin'

export class WebApp extends FangchaApp {
  public constructor(protocol: AppProtocol & { routerOptions: RouterSdkOptions }) {
    super(protocol)

    const routerApp = _RouterState.routerApp
    routerApp.addDocItem(HealthDocItem)
    routerApp.addDocItem(KitProfileSpecDocItem)

    this.protocol.plugins = [
      RouterSdkPlugin({
        ...protocol.routerOptions,
        routerApp: _RouterState.routerApp,
      }),
      ...this.protocol.plugins,
    ]
  }
}

import { FangchaApp } from '../main'
import { AppProtocol } from '../basic'
import { HealthDocItem } from './retained-specs/HealthSpecs'
import { KitProfileSpecDocItem } from '../profile'
import { _RouterState } from './_RouterState'
import { RouterSdkOptions } from './RouterSdkOptions'
import { RouterPlugin } from './RouterPlugin'
import { JwtSessionSpecDocItem } from './retained-specs/JwtSessionSpecs'

export class WebApp extends FangchaApp {
  routerPlugin: RouterPlugin

  public constructor(protocol: AppProtocol & { useJwtSpecs?: boolean; routerOptions: RouterSdkOptions }) {
    super(protocol)

    const routerApp = _RouterState.routerApp
    routerApp.addDocItem(HealthDocItem)
    routerApp.addDocItem(KitProfileSpecDocItem)
    if (protocol.useJwtSpecs) {
      routerApp.addDocItem(JwtSessionSpecDocItem)
    }

    this.routerPlugin = new RouterPlugin({
      ...protocol.routerOptions,
      routerApp: routerApp,
    })
    _RouterState.routerPlugin = this.routerPlugin

    this.protocol.plugins = [this.routerPlugin, ...this.protocol.plugins]
  }
}

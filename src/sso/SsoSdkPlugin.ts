import { AppPluginProtocol } from '../basic'
import { SsoProtocol } from '../basic/SsoProtocol'
import { SsoSpecDocItem } from './WebSsoSpecs'
import { _TinyApp } from '../main'

export const SsoSdkPlugin = (options: SsoProtocol): AppPluginProtocol => {
  return {
    appDidLoad: async () => {
      _TinyApp.setSsoProtocol(options)
    },
    specDocItem: SsoSpecDocItem,
  }
}

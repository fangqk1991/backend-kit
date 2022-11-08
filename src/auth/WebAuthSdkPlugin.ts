import { AppPluginProtocol } from '../basic'
import { WebAuthProtocol } from './WebAuthProtocol'
import { _WebAuthState } from './_WebAuthState'
import { WebAuthSpecDocItem } from './WebAuthSpecs'

export const WebAuthSdkPlugin = (options: WebAuthProtocol): AppPluginProtocol => {
  return {
    appDidLoad: async () => {
      _WebAuthState.setAuthProtocol(options)
    },
    specDocItems: [WebAuthSpecDocItem],
  }
}

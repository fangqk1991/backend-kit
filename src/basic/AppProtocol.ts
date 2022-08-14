import { AppPluginProtocol } from './AppPluginProtocol'

export interface AppProtocol {
  plugins: AppPluginProtocol[]
  appDidLoad?: () => void | Promise<void>
}

import { SwaggerDocItem } from '@fangcha/router'

export interface AppProtocol {
  plugins: AppPluginProtocol[]
  checkHealth?: () => Promise<void>
  appDidLoad?: () => Promise<void>
  onLaunchError?: (err: Error) => void
}

export interface AppPluginProtocol {
  appDidLoad: (app: AppProtocol) => void | Promise<void>
  appWillLoad?: (app: AppProtocol) => void | Promise<void>
  specDocItem?: SwaggerDocItem
  resqueModuleMap?: { [p: string]: any }
}

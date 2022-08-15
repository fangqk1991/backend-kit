import { SwaggerDocItem } from '@fangcha/router'

export interface AppProtocol {
  env: string
  appName: string
  plugins: AppPluginProtocol[]

  checkHealth?: () => Promise<void>
  appDidLoad?: () => Promise<void>
  onLaunchError?: (err: Error) => void

  wecomBotKey?: string

  // baseURL?: string
  // jwtProtocol?: JWTProtocol
}

export interface AppPluginProtocol {
  appDidLoad: (app: AppProtocol) => void | Promise<void>
  appWillLoad?: (app: AppProtocol) => void | Promise<void>
  specDocItem?: SwaggerDocItem
  resqueModuleMap?: { [p: string]: any }
}

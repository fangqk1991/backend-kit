import { SwaggerDocItem } from '@fangcha/router'
import { JWTProtocol } from './JWTProtocol'

export interface AppProtocol {
  env: string
  tags?: string[]

  appName: string
  plugins: AppPluginProtocol[]

  checkHealth?: () => Promise<void>
  appDidLoad?: () => Promise<void>

  wecomBotKey?: string

  baseURL?: string
  jwtProtocol?: JWTProtocol
}

export interface AppPluginProtocol {
  appDidLoad: (app: AppProtocol) => void | Promise<void>
  appWillLoad?: (app: AppProtocol) => void | Promise<void>
  specDocItem?: SwaggerDocItem
  resqueModuleMap?: { [p: string]: any }
}

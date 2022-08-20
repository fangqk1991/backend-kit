import { SwaggerDocItem } from '@fangcha/router'
import { JWTProtocol } from './JWTProtocol'
import { BasicAuthProtocol } from './BasicAuthProtocol'

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
  basicAuthProtocol?: BasicAuthProtocol
}

export interface AppPluginProtocol {
  appDidLoad: (app: AppProtocol) => void | Promise<void>
  appWillLoad?: (app: AppProtocol) => void | Promise<void>
  specDocItem?: SwaggerDocItem
  resqueModuleMap?: { [p: string]: any }
}

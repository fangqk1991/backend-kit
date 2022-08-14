import { SwaggerDocItem } from '@fangcha/router'

export interface AppPluginProtocol {
  appDidLoad: () => void | Promise<void>
  appWillLoad?: () => void | Promise<void>
  specDocItem?: SwaggerDocItem
  resqueModuleMap?: { [p: string]: any }
}

// export type AppPluginGenerator<T = any> = (options?: T) => AppPluginProtocol

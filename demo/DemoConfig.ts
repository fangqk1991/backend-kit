import { GlobalAppConfig } from 'fc-config'
import { AuthMode } from '@fangcha/account/lib/common/models'

export const DemoConfig = GlobalAppConfig as {
  baseURL: string
  backendPort: number
  jwtKey: string
  jwtSecret: string
  database: any
  AuthSDK: {
    authMode: AuthMode
    retainedUserData?: {
      // username -> password
      [username: string]: string
    }
    oauthConfig: any
  }
}

import { GlobalAppConfig } from 'fc-config'

export const DemoConfig = GlobalAppConfig as {
  baseURL: string
  backendPort: number
  jwtKey: string
  jwtSecret: string
  database: any
  AuthSDK: {
    retainedUserData?: {
      // username -> password
      [username: string]: string
    }
  }
  SsoSDK: any
}

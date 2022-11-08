import { GlobalAppConfig } from 'fc-config'

export const DemoConfig = GlobalAppConfig as {
  baseURL: string
  backendPort: number
  jwtKey: string
  jwtSecret: string
  AuthSDK: {
    usernameRetained: string
    passwordRetained: string
  }
  SsoSDK: any
}

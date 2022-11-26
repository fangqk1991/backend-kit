import { DemoConfig } from '../DemoConfig'
import { WebApp } from '../../src/router'
import { TypicalSsoSdkPlugin } from '../../src/sso'

const app = new WebApp({
  env: 'development',
  appName: 'sso-demo',
  routerOptions: {
    baseURL: DemoConfig.baseURL,
    backendPort: DemoConfig.backendPort,
    jwtProtocol: {
      jwtKey: DemoConfig.jwtKey,
      jwtSecret: DemoConfig.jwtSecret,
    },
  },
  plugins: [TypicalSsoSdkPlugin(DemoConfig.AuthSDK.oauthConfig)],
})
app.launch()

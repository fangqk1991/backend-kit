import { DemoConfig } from '../DemoConfig'
import { RouterSdkPlugin } from '../../src/router'
import { RouterApp } from '@fangcha/router'
import { TypicalSsoSdkPlugin } from '../../src/sso'
import { FangchaApp } from '../../src'

const app = new FangchaApp({
  env: 'development',
  appName: 'sso-demo',
  plugins: [
    RouterSdkPlugin({
      baseURL: DemoConfig.baseURL,
      backendPort: DemoConfig.backendPort,
      routerApp: new RouterApp({
        docItems: [],
      }),
      jwtProtocol: {
        jwtKey: DemoConfig.jwtKey,
        jwtSecret: DemoConfig.jwtSecret,
      },
    }),
    TypicalSsoSdkPlugin(DemoConfig.SsoSDK),
  ],
})
app.launch()

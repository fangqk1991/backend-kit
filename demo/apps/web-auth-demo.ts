import { DemoConfig } from '../DemoConfig'
import { WebAuthSdkPlugin } from '../../src/auth'
import { FangchaApp } from '../../src'
import { RouterApp } from '@fangcha/router'
import { RouterSdkPlugin } from '../../src/router'

const app = new FangchaApp({
  env: 'development',
  appName: 'web-auth',
  plugins: [
    RouterSdkPlugin({
      baseURL: DemoConfig.baseURL,
      backendPort: DemoConfig.backendPort,
      routerApp: new RouterApp({
        useHealthSpecs: true,
        docItems: [],
      }),
      jwtProtocol: {
        jwtKey: DemoConfig.jwtKey,
        jwtSecret: DemoConfig.jwtSecret,
      },
    }),
    WebAuthSdkPlugin(DemoConfig.AuthSDK),
  ],
})
app.launch()

import { DemoConfig } from '../DemoConfig'
import { WebAuthSdkPlugin } from '../../src/auth'
import { FangchaApp } from '../../src'
import { RouterApp } from '@fangcha/router'
import { RouterSdkPlugin } from '../../src/router'
import { AccountServer } from '@fangcha/account'
import { MyDatabase } from '../services/MyDatabase'

const app = new FangchaApp({
  env: 'development',
  appName: 'web-auth',
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
    WebAuthSdkPlugin({
      retainedUserData: DemoConfig.AuthSDK.retainedUserData,
      accountServer: new AccountServer({
        database: MyDatabase.demoDB,
      }),
    }),
  ],
})
app.launch()

import { DemoConfig } from '../DemoConfig'
import { WebAuthSdkPlugin } from '../../src/auth'
import { WebApp } from '../../src/router'
import { AccountServer } from '@fangcha/account'
import { MyDatabase } from '../services/MyDatabase'
import { AuthMode } from '@fangcha/account/lib/common/models'

const app = new WebApp({
  env: 'development',
  appName: 'web-auth',
  routerOptions: {
    baseURL: DemoConfig.baseURL,
    backendPort: DemoConfig.backendPort,
    jwtProtocol: {
      jwtKey: DemoConfig.jwtKey,
      jwtSecret: DemoConfig.jwtSecret,
    },
  },
  plugins: [
    WebAuthSdkPlugin({
      authMode: AuthMode.Simple,
      simpleAuth: {
        retainedUserData: DemoConfig.AuthSDK.retainedUserData,
        accountServer: new AccountServer({
          database: MyDatabase.demoDB,
        }),
      },
    }),
  ],
})
app.launch()

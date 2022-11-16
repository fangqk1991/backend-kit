import { DemoConfig } from '../DemoConfig'
import { WebAuthSdkPlugin } from '../../src/auth'
import { WebApp } from '../../src/router'
import { AccountServer } from '@fangcha/account'
import { MyDatabase } from '../services/MyDatabase'
import { AuthMode } from '@fangcha/account/lib/common/models'
import { _FangchaState } from '../../src'

const app = new WebApp({
  env: 'development',
  appName: 'web-auth',
  appDidLoad: async () => {
    _FangchaState.frontendConfig = {
      appName: 'Auth Demo',
      background: 'linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)',
      logoCss: 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)',
    }
  },
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

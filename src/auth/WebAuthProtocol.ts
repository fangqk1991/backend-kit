import { AccountServer } from '@fangcha/account'
import { AuthMode } from '@fangcha/account/lib/common/models'
import { OAuthClientConfig } from '@fangcha/tools/lib/oauth-client'

export interface SimpleAuthProtocol {
  retainedUserData?: {
    // username -> password
    [username: string]: string
  }
  accountServer?: AccountServer
}

export interface SsoAuthProtocol<T = any> {
  oauthConfig: OAuthClientConfig & { userInfoURL: string }
  getUserInfo: (accessToken: string) => Promise<T>
}

export interface WebAuthProtocol<T = any> {
  authMode: AuthMode
  simpleAuth?: SimpleAuthProtocol
  ssoAuth?: SsoAuthProtocol<T>
}

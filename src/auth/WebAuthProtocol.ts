import { AccountServer } from '@fangcha/account'
import { OAuthClientConfig } from '@fangcha/tools/lib/oauth-client'

export interface SimpleAuthProtocol {
  retainedUserData?: {
    // username -> password
    [username: string]: string
  }
  accountServer?: AccountServer
}

export interface SsoAuthProtocol<T = any> {
  oauthConfig: OAuthClientConfig
  getUserInfo: (accessToken: string) => Promise<T>
}

export interface WebAuthProtocol<T = any> {
  authMode: 'simple' | 'sso'
  simpleAuth?: SimpleAuthProtocol
  ssoAuth?: SsoAuthProtocol<T>
}

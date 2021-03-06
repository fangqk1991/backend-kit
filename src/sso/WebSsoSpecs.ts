import assert from '@fangcha/assert'
import * as jsonwebtoken from 'jsonwebtoken'
import { SpecFactory, SwaggerDocItem } from '@fangcha/router'
import { KitAdminSsoApis } from '../apis/KitAdminSsoApis'
import { _TinyApp, CustomRequestFollower, FangchaSession } from '../main'
import { OAuthClient } from '@fangcha/tools/lib/oauth-client'

const makeOAuthClient = () => {
  return new OAuthClient(_TinyApp.ssoProtocol.oauthConfig, CustomRequestFollower)
}

const factory = new SpecFactory('SSO', { skipAuth: true })

factory.prepare(KitAdminSsoApis.Login, async (ctx) => {
  const session = ctx.session as FangchaSession
  const ssoProxy = makeOAuthClient()
  ctx.redirect(ssoProxy.getAuthorizeUri(session.getRefererUrl()))
})

factory.prepare(KitAdminSsoApis.Logout, async (ctx) => {
  ctx.cookies.set(_TinyApp.jwtProtocol.jwtKey, '', {
    maxAge: 0,
  })
  const session = ctx.session as FangchaSession
  const ssoProxy = makeOAuthClient()
  ctx.redirect(ssoProxy.buildLogoutUrl(session.getRefererUrl()))
})

factory.prepare(KitAdminSsoApis.SSOHandle, async (ctx) => {
  const { code, state: redirectUri } = ctx.request.query
  assert.ok(!!code && typeof code === 'string', 'code invalid.')
  assert.ok(typeof redirectUri === 'string', 'state/redirectUri invalid')
  const ssoProxy = makeOAuthClient()
  const accessToken = await ssoProxy.getAccessTokenFromCode(code as string)
  const userInfo = await _TinyApp.ssoProtocol.getUserInfo(accessToken)
  const aliveSeconds = 24 * 3600
  const jwt = jsonwebtoken.sign(userInfo, _TinyApp.jwtProtocol.jwtSecret, { expiresIn: aliveSeconds })
  ctx.cookies.set(_TinyApp.jwtProtocol.jwtKey, jwt, { maxAge: aliveSeconds * 1000 })
  const session = ctx.session as FangchaSession
  ctx.redirect(session.correctUrl(redirectUri as string))
})

export const WebSsoSpecs = factory.buildSpecs()

export const SsoSpecDocItem: SwaggerDocItem = {
  name: 'SSO',
  pageURL: '/api-docs/v1/sso-sdk',
  specs: WebSsoSpecs,
}

import { SpecFactory, SwaggerDocItem } from '@fangcha/router'
import { KitAuthApis } from '../apis'
import { _SessionApp, FangchaSession } from '@fangcha/router/lib/session'
import * as jsonwebtoken from 'jsonwebtoken'
import { _WebAuthState } from './_WebAuthState'
import { AccountErrorPhrase, CarrierType, VisitorCoreInfo } from '@fangcha/account/lib/common/models'
import { AppException } from '@fangcha/app-error'

const factory = new SpecFactory('Auth', { skipAuth: true })

factory.prepare(KitAuthApis.Login, async (ctx) => {
  const params = ctx.request.body as {
    email: string
    password: string
  }
  params.email = (params.email || '').trim()
  const userInfo: VisitorCoreInfo = {
    accountUid: params.email,
    email: params.email,
  }
  let passed = false
  const userData = _WebAuthState.authProtocol.retainedUserData || {}
  if (params.email in userData) {
    if (userData[params.email] !== params.password) {
      throw AppException.exception(AccountErrorPhrase.PasswordIncorrect)
    }
    passed = true
  }
  const accountServer = _WebAuthState.authProtocol.accountServer
  if (accountServer) {
    const carrier = await accountServer.findCarrier(CarrierType.Email, params.email)
    if (!carrier) {
      throw AppException.exception(AccountErrorPhrase.AccountNotExists)
    }
    const account = await accountServer.findAccount(carrier.accountUid)
    account.assertPasswordCorrect(params.password)
    userInfo.accountUid = account.accountUid
    passed = true
  }
  if (!passed) {
    throw AppException.exception(AccountErrorPhrase.PasswordIncorrect)
  }
  const aliveSeconds = 24 * 3600
  const jwt = jsonwebtoken.sign(userInfo, _SessionApp.jwtProtocol.jwtSecret, { expiresIn: aliveSeconds })
  ctx.cookies.set(_SessionApp.jwtProtocol.jwtKey, jwt, { maxAge: aliveSeconds * 1000 })
  ctx.status = 200
})

factory.prepare(KitAuthApis.Logout, async (ctx) => {
  ctx.cookies.set(_SessionApp.jwtProtocol.jwtKey, '', {
    maxAge: 0,
  })
  ctx.status = 200
})

factory.prepare(KitAuthApis.RedirectLogin, async (ctx) => {
  const session = ctx.session as FangchaSession
  ctx.redirect(`/login?redirectUri=${encodeURIComponent(session.getRefererUrl())}`)
})

factory.prepare(KitAuthApis.RedirectLogout, async (ctx) => {
  ctx.cookies.set(_SessionApp.jwtProtocol.jwtKey, '', {
    maxAge: 0,
  })
  const session = ctx.session as FangchaSession
  ctx.redirect(session.getRefererUrl())
})

export const WebAuthSpecs = factory.buildSpecs()

export const WebAuthSpecDocItem: SwaggerDocItem = {
  name: 'Login',
  pageURL: '/api-docs/v1/auth-sdk',
  specs: WebAuthSpecs,
}

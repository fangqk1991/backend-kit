import { SpecFactory, SwaggerDocItem } from '@fangcha/router'
import { KitAuthApis } from '../apis'
import { _SessionApp } from '@fangcha/router/lib/session'
import * as jsonwebtoken from 'jsonwebtoken'
import { _WebAuthState } from './_WebAuthState'
import assert from '@fangcha/assert'

const factory = new SpecFactory('Auth', { skipAuth: true })

factory.prepare(KitAuthApis.Login, async (ctx) => {
  const params = ctx.request.body as {
    email: string
    password: string
  }
  assert.ok(_WebAuthState.authProtocol.usernameRetained === params.email, `email error`)
  assert.ok(_WebAuthState.authProtocol.passwordRetained === params.password, `password error`)
  const aliveSeconds = 24 * 3600
  const jwt = jsonwebtoken.sign(
    {
      email: params.email,
    },
    _SessionApp.jwtProtocol.jwtSecret,
    { expiresIn: aliveSeconds }
  )
  ctx.cookies.set(_SessionApp.jwtProtocol.jwtKey, jwt, { maxAge: aliveSeconds * 1000 })
  ctx.status = 200
})

factory.prepare(KitAuthApis.Logout, async (ctx) => {
  ctx.cookies.set(_SessionApp.jwtProtocol.jwtKey, '', {
    maxAge: 0,
  })
  ctx.redirect('/')
})

export const WebAuthSpecs = factory.buildSpecs()

export const WebAuthSpecDocItem: SwaggerDocItem = {
  name: 'Login',
  pageURL: '/api-docs/v1/auth-sdk',
  specs: WebAuthSpecs,
}

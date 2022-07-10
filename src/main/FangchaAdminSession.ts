import { Context } from 'koa'
import * as jsonwebtoken from 'jsonwebtoken'
import assert from '@fangcha/assert'
import { FangchaSession } from './FangchaSession'
import { _TinyApp } from './_TinyApp'

interface UserCoreInfo {
  email: string
}

export class FangchaAdminSession extends FangchaSession {
  protected _authInfo: UserCoreInfo = {
    email: '',
  }
  private _jwtCookieStr: string

  public constructor(ctx: Context) {
    super(ctx)
    assert.ok(!!_TinyApp.jwtProtocol, 'jwtProtocol missing', 500)
    {
      this._jwtCookieStr = ctx.cookies.get(_TinyApp.jwtProtocol.jwtKey) || ''
      this._authInfo = this.extractAuthInfo()
    }
    this.logger.addContext('user', this._authInfo.email || '-')
  }

  public curUserStr() {
    return this._authInfo.email || '-'
  }

  public curUserInfo() {
    return this._authInfo
  }

  private extractAuthInfo(verifySign = false) {
    let result: UserCoreInfo = {
      email: '',
    }
    const authInfo = (
      verifySign
        ? jsonwebtoken.verify(this._jwtCookieStr, _TinyApp.jwtProtocol!.jwtSecret)
        : jsonwebtoken.decode(this._jwtCookieStr)
    ) as UserCoreInfo
    if (authInfo && authInfo.email) {
      result = authInfo
    }
    return result
  }

  public auth() {
    try {
      this._authInfo = this.extractAuthInfo(true)
      assert.ok(!!this._authInfo.email, 'JWT Authorization missing.', 401)
    } catch (e) {
      assert.ok(false, 'JWT Authorization missing.', 401)
    }
  }
}

import { Context } from 'koa'
import { makeUUID } from '@fangcha/tools'
import { Logger } from 'log4js'
import log4js from '@fangcha/logger'
import { _TinyApp } from './_TinyApp'

export class FangchaSession {
  public readonly sessionId!: string
  public readonly headers: { [p: string]: any }
  public readonly realIP!: string
  public readonly reqid!: string
  public readonly logger: Logger

  public constructor(ctx: Context) {
    this.sessionId = makeUUID()
    this.headers = ctx.request.headers
    this.reqid = this.headers['x-request-id'] || makeUUID()
    {
      const headers = this.headers
      let realIP = headers['x-real-ip'] || ctx.ip
      if (headers['x-forwarded-for']) {
        const ips = headers['x-forwarded-for'].split(',')
        if (ips.length > 0 && ips[0].length > 0) {
          realIP = ips[0]
        }
      }
      this.realIP = realIP
    }

    {
      const logger = log4js.getLogger()
      logger.addContext('ip', this.realIP || '-')
      logger.addContext('reqid', this.reqid || '-')
      logger.addContext('user', '-')
      this.logger = logger
    }
  }

  public curUserStr() {
    return '-'
  }

  public curUserInfo() {
    return {} as any
  }

  public getRefererUrl() {
    return this.correctUrl(this.headers['referer'] || '')
  }

  public correctUrl(url: string) {
    const matches = url.match(/^(https?:\/\/.*?)\//)
    if (matches) {
      return url.replace(matches[1], _TinyApp.baseURL)
    }
    return _TinyApp.baseURL
  }

  public auth() {}

  public checkVisitorIsAdmin() {
    return _TinyApp.checkUserIsAdmin(this.curUserStr())
  }

  public checkVisitorHasPermission(permissionKey: string) {
    return _TinyApp.checkUserHasPermission(this.curUserStr(), permissionKey)
  }

  public checkVisitorInAnyGroup(...groupIds: string[]) {
    return _TinyApp.checkUserInAnyGroup(this.curUserStr(), ...groupIds)
  }

  public assertVisitorIsAdmin() {
    _TinyApp.assertUserIsAdmin(this.curUserStr())
  }

  public assertVisitorHasPermission(permissionKey: string) {
    _TinyApp.assertUserHasPermission(this.curUserStr(), permissionKey)
  }

  public assertVisitorInAnyGroup(...groupIds: string[]) {
    _TinyApp.assertUserInAnyGroup(this.curUserStr(), ...groupIds)
  }
}

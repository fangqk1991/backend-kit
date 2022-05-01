import { Context } from 'koa'
import { makeUUID } from '@fangcha/tools'
import { Logger } from 'log4js'
import log4js from '@fangcha/logger'

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

  // TODO
  // public getRefererUrl() {
  //   return this.correctUrl(this.headers['referer'] || '')
  // }
  //
  // public correctUrl(url: string) {
  //   const matches = url.match(/^(https?:\/\/.*?)\//)
  //   if (matches) {
  //     return url.replace(matches[1], BackendApp.baseURL())
  //   }
  //   return BackendApp.baseURL()
  // }

  public auth() {}
}

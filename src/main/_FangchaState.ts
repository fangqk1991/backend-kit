import { WecomProxy } from '../alert'
import { logger } from '@fangcha/logger'

class __FangchaState {
  appName: string = ''

  env: string = 'development'
  tags: string[] = []

  botProxy: WecomProxy = new WecomProxy({})

  _checkHealthHandler = async () => {}

  async checkHealth() {
    await this._checkHealthHandler()
      .then(() => {
        logger.info(`[${this.env}] Health Checking Passed.`)
      })
      .catch((err) => {
        logger.error(err)
        _FangchaState.botProxy.notifyHealthCheckingError(err.message)
        throw err
      })
  }
}

export const _FangchaState = new __FangchaState()

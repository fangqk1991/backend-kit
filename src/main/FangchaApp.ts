import { AppPluginProtocol } from '../basic'
import { AppProtocol } from '../basic/AppProtocol'

export class FangchaApp implements AppProtocol {
  public plugins: AppPluginProtocol[] = []
}

import { SsoProtocol } from '../basic/SsoProtocol'

class __TinyApp {
  public ssoProtocol!: SsoProtocol

  public setSsoProtocol(protocol: SsoProtocol) {
    this.ssoProtocol = protocol
    return this
  }
}

export const _TinyApp = new __TinyApp()

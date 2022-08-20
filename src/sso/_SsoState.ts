import { SsoProtocol } from '../basic/SsoProtocol'

class __SsoState {
  public ssoProtocol!: SsoProtocol

  public setSsoProtocol(protocol: SsoProtocol) {
    this.ssoProtocol = protocol
    return this
  }
}

export const _SsoState = new __SsoState()

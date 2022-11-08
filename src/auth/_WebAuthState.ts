import { WebAuthProtocol } from './WebAuthProtocol'

class __WebAuthState {
  public authProtocol!: WebAuthProtocol

  public setAuthProtocol(protocol: WebAuthProtocol) {
    this.authProtocol = protocol
    return this
  }
}

export const _WebAuthState = new __WebAuthState()

import { WebAuthProtocol } from './WebAuthProtocol'
import assert from '@fangcha/assert'

class __WebAuthState {
  public authProtocol!: WebAuthProtocol

  public setAuthProtocol(protocol: WebAuthProtocol) {
    protocol.authMode = protocol.authMode || 'simple'
    if (protocol.authMode === 'sso') {
      assert.ok(!!protocol.ssoAuth, `WebAuthProtocol.ssoAuth invalid.`, 500)
    } else {
      assert.ok(!!protocol.simpleAuth, `WebAuthProtocol.simpleAuth invalid.`, 500)
    }
    this.authProtocol = protocol
    return this
  }
}

export const _WebAuthState = new __WebAuthState()

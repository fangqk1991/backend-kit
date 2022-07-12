import assert from '@fangcha/assert'
import { JWTProtocol, PermissionProtocol } from '../basic'
import { SsoProtocol } from '../basic/SsoProtocol'

class __TinyApp implements PermissionProtocol {
  public baseURL: string = ''
  public jwtProtocol!: JWTProtocol
  public ssoProtocol!: SsoProtocol

  public checkUserIsAdmin = (_email: string) => {
    return false
  }

  public checkUserHasPermission = (_email: string, _permissionKey: string) => {
    return false
  }

  public checkUserInAnyGroup = (_email: string, ..._groupIds: string[]) => {
    return false
  }

  public assertUserIsAdmin(email: string) {
    assert.ok(this.checkUserIsAdmin(email), `${email} 必须为应用的管理员`, 403)
  }

  public assertUserHasPermission(email: string, permissionKey: string) {
    assert.ok(this.checkUserHasPermission(email, permissionKey), `${email} 不具备权限 "${permissionKey}"`, 403)
  }

  public assertUserInAnyGroup(email: string, ...groupIds: string[]) {
    assert.ok(this.checkUserInAnyGroup(email, ...groupIds), `${email} 不 "${groupIds.join(' | ')}" 组中`, 403)
  }

  public setPermissionProtocol(protocol: PermissionProtocol) {
    this.checkUserIsAdmin = protocol.checkUserIsAdmin
    this.checkUserHasPermission = protocol.checkUserHasPermission
    return this
  }

  public setJWTProtocol(protocol: JWTProtocol) {
    assert.ok(!!protocol.jwtKey, 'jwtProtocol.jwtKey error', 500)
    assert.ok(!!protocol.jwtSecret, 'jwtProtocol.jwtSecret error', 500)
    this.jwtProtocol = protocol
    return this
  }

  public setSsoProtocol(protocol: SsoProtocol) {
    this.ssoProtocol = protocol
    return this
  }
}

export const _TinyApp = new __TinyApp()

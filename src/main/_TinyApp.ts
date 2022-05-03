import assert from '@fangcha/assert'

class __TinyApp {
  public baseURL: string = ''

  public checkUserIsAdmin = (_email: string) => {
    return false
  }

  public checkUserHasPermission = (_email: string, _permissionKey: string) => {
    return true
  }

  public assertUserIsAdmin(email: string) {
    assert.ok(this.checkUserIsAdmin(email), `${email} 必须为应用的管理员`, 403)
  }

  public assertUserHasPermission(email: string, permissionKey: string) {
    assert.ok(this.checkUserHasPermission(email, permissionKey), `${email} 不具备权限 "${permissionKey}"`, 403)
  }
}

export const _TinyApp = new __TinyApp()

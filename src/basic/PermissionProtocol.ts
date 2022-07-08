export interface PermissionProtocol {
  checkUserIsAdmin: (email: string) => boolean
  checkUserHasPermission: (email: string, permissionKey: string) => boolean
}

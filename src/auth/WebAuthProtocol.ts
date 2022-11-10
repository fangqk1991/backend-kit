import { AccountServer } from '@fangcha/account'

export interface WebAuthProtocol<T = any> {
  retainedUserData?: {
    // username -> password
    [username: string]: string
  }
  accountServer?: AccountServer
}

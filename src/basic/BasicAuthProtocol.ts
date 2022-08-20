import { OpenVisitor } from './OpenVisitor'

export interface BasicAuthProtocol {
  findVisitor: (username: string, password: string) => OpenVisitor
}

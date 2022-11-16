export interface SessionInfo {
  env: string
  tags: string[]
  codeVersion: string
  config: {
    [key: string]: any
  }

  userInfo: {
    email: string
  } | null
}

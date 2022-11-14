import { RouterApp } from '@fangcha/router'

class __RouterState {
  locked = false
  routerApp: RouterApp

  constructor() {
    this.routerApp = new RouterApp({
      docItems: [],
    })
  }
}

export const _RouterState = new __RouterState()

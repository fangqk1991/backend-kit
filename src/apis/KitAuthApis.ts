import { Api } from '@fangcha/swagger'

export const KitAuthApis = {
  Login: {
    method: 'POST',
    route: '/api/auth-sdk/v1/login',
    description: '登录',
    parameters: [
      {
        name: 'bodyData',
        type: 'object',
        in: 'body',
        schema: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            email: {
              type: 'string',
              example: 'admin@example.com',
            },
            password: {
              type: 'string',
              example: 'admin',
            },
          },
        },
      },
    ],
  } as Api,
  Logout: {
    method: 'GET',
    route: '/api/auth-sdk/v1/logout',
    description: '登出',
  } as Api,
  RedirectLogin: {
    method: 'GET',
    route: '/api-302/auth-sdk/v1/login',
    description: '登录',
  } as Api,
  RedirectLogout: {
    method: 'GET',
    route: '/api-302/auth-sdk/v1/logout',
    description: '登出',
  } as Api,
  RedirectHandleSSO: {
    method: 'GET',
    route: '/api-302/auth-sdk/v1/handle-sso',
    description: '处理 SSO 回调',
  } as Api,
}

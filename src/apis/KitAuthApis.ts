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
}

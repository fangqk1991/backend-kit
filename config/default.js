module.exports = {
  baseURL: 'http://localhost:16130',
  backendPort: 16130,
  jwtKey: 'backend_kit_jwt',
  jwtSecret: 'some-jwt-secret',
  database: {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    database: 'demo_db',
    username: 'root',
    password: '',
  },
  AuthSDK: {
    retainedUserData: {
      'admin@example.com': 'admin',
    },
  },
  SsoSDK: {
    baseURL: 'https://sso.example.com',
    clientId: '<clientId>',
    clientSecret: '<clientSecret>',
    authorizePath: '/api/v1/oauth/authorize',
    tokenPath: '/api/v1/oauth/token',
    logoutPath: '/api/v1/logout',
    scope: 'basic',
    callbackUri: 'http://localhost:8080/api/v1/handleSSO',
    userInfoURL: 'https://sso.example.com/api/v1/oauth/user-info',
  },
}

module.exports = {
  baseURL: 'http://localhost:16130',
  backendPort: 16130,
  jwtKey: 'backend_kit_jwt',
  jwtSecret: 'some-jwt-secret',
  AuthSDK: {
    usernameRetained: 'admin@example.com',
    passwordRetained: 'admin',
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


export const environment = {
    production: false,
    mocking: true,
    baseUrl: 'https://localhost:5001',
    authentication: {
      authUrl: 'http://localhost:5000',
      callbackUrl: 'http://localhost:4200/auth-callback',
      redirectUrl: 'http://localhost:4200',
      clientId: 'angular_spa'
    }
};

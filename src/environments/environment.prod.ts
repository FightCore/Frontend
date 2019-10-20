export const environment = {
  production: true,
  mocking: false,
  baseUrl: 'https://localhost:5001',
  authentication: {
    authUrl: 'http://localhost:5000',
    callbackUrl: 'http://localhost:4200/auth-callback',
    redirectUrl: 'http://localhost:4200',
    clientId: 'angular_spa'
  },
  links: {
    discord: 'https://discord.gg/CVqDy6c',
    github: 'https://github.com/fightcore',
    dockerhub: 'https://cloud.docker.com/u/fightcore/repository/list',
    kofi: 'https://ko-fi.com/bartdebever',
    twitter: null
  }
};

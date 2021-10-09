export const environment = {
  production: true,
  mocking: false,
  enableAvatars: false,
  baseUrl: 'https://api.fightcore.gg',
  authentication: {
    authUrl: 'https://identity.fightcore.gg',
    callbackUrl: 'https://www.fightcore.gg/auth-callback',
    redirectUrl: 'https://www.fightcore.gg',
    clientId: 'fightcore_prod',
  },
  links: {
    discord: 'https://discord.gg/CVqDy6c',
    github: 'https://github.com/fightcore',
    dockerhub: 'https://cloud.docker.com/u/fightcore/repository/list',
    kofi: 'https://ko-fi.com/bartdebever',
    twitter: null,
  },
  firebase: {
    apiKey: 'AIzaSyC60bgr4xktHZZgdgy0slA4-rnSFEpNj8w',
    authDomain: 'fightcore.firebaseapp.com',
    projectId: 'fightcore',
    storageBucket: 'fightcore.appspot.com',
    messagingSenderId: '597172083785',
    appId: '1:597172083785:web:a07e5541d83b37d3c83398',
    measurementId: 'G-QGRHJHJW7L',
  },
};

const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8090/',
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;

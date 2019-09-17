const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/graphql', proxy({
    target: 'http://localhost:5100',
    changeOrigin: true,
  }));
};
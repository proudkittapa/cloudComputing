const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware(['/bababook'], { target: 'http://172.38.20.142:8080' }));
};
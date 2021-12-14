// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(createProxyMiddleware(['/bababook'], { target: 'http://172.38.20.142:8080' }));
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    // '/AdoptMe',
    createProxyMiddleware({
      target: 'http://0.0.0.0:3000/',
      changeOrigin: true,
    })
  );
};
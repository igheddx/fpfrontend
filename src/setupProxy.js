const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws',
      changeOrigin: true,
    })
  );
};

//"proxy": "https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws",
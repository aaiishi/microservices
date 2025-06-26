// auth-gateway/src/app.js
require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwtMiddleware = require('./middlewares/jwt.middleware');

const app = express();

// 1) Debug de toutes les requêtes reçues
app.use((req, res, next) => {
  console.log(`[AuthGateway] ${new Date().toISOString()} --> ${req.method} ${req.originalUrl}`);
  next();
});

// 2) Helper pour tracer les ProxyReq
function proxyLogger(target) {
  return {
    onProxyReq(proxyReq, req, res) {
      console.log(`[AuthGateway] proxyReq  : ${req.method} ${req.originalUrl} -> ${target}${req.originalUrl}`);
    },
    onProxyRes(proxyRes, req, res) {
      console.log(`[AuthGateway] proxyRes  : ${req.method} ${req.originalUrl} <- ${proxyRes.statusCode}`);
    },
    onError(err, req, res) {
      console.error(`[AuthGateway] proxyError: ${req.method} ${req.originalUrl} -> ${err.message}`);
      res.status(502).send('Bad gateway');
    }
  };
}

// 3) Proxy PUBLIC pour /auth
app.use(
  '/auth',
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    ...proxyLogger(process.env.USER_SERVICE_URL)
  })
);

// 4) Proxy PROTÉGÉ pour /users
app.use(
  '/users',
  jwtMiddleware,
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    ...proxyLogger(process.env.USER_SERVICE_URL)
  })
);

// 5) Proxy PROTÉGÉ pour /auctions
app.use(
  '/auctions',
  jwtMiddleware,
  createProxyMiddleware({
    target: process.env.AUCTION_SERVICE_URL,
    changeOrigin: true,
    ...proxyLogger(process.env.AUCTION_SERVICE_URL)
  })
);

// 6) Proxy PROTÉGÉ pour /bids
app.use(
  '/bids',
  jwtMiddleware,
  createProxyMiddleware({
    target: process.env.BID_SERVICE_URL,
    changeOrigin: true,
    ...proxyLogger(process.env.BID_SERVICE_URL)
  })
);

// 7) Démarrage
app.listen(process.env.PORT, () => {
  console.log(`Auth-Gateway démarré sur le port ${process.env.PORT}`);
});

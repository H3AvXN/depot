// Minimaler CORS-Proxy für Capital.com (Render-ready)
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Erlaube allen Ursprüngen Zugriff (CORS)
app.use(cors());

// Proxy für Capital.com API mit Header-Weiterleitung
app.use('/capital', createProxyMiddleware({
  target: 'https://api-capital.backend-capital.com',
  changeOrigin: true,
  pathRewrite: {
    '^/capital': ''
  },
  onProxyRes: (proxyRes, req, res) => {
    const exposeHeaders = ['CST', 'X-SECURITY-TOKEN'];
    exposeHeaders.forEach(header => {
      const value = proxyRes.headers[header.toLowerCase()];
      if (value) {
        res.setHeader(header, value);
      }
    });
    res.setHeader('Access-Control-Expose-Headers', exposeHeaders.join(', '));
  }
}));

// Start auf dynamischem Port für Render
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`CORS Proxy läuft auf Port ${PORT}`);
});

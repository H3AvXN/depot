// Minimaler CORS-Proxy-Server (für Render, Railway oder lokal)
// Datei: server.js

const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Erlaube allen Ursprüngen Zugriff (für private Tools)
app.use(cors());

// Leite alle API-Anfragen an Capital.com weiter
app.use('/capital', createProxyMiddleware({
  target: 'https://api-capital.backend-capital.com',
  changeOrigin: true,
  pathRewrite: {
    '^/capital': '' // entfernt /capital vom Pfad
  }
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`CORS Proxy läuft auf Port ${PORT}`);
});

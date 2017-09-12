const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const index = require('./routes/index');

const app = express();

if (process.env.API_BASE_URL && process.env.PROXY_TARGET) {
  app.use(
    process.env.API_BASE_URL,
    proxy({ target: process.env.PROXY_TARGET, changeOrigin: true })
  );
}

app.use('/', index);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

module.exports = app;

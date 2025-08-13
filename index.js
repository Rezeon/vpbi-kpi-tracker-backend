const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

module.exports = app;
module.exports.handler = serverless(app);

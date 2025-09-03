const app = require('./scr/app');
const serverless = require('serverless-http');

module.exports = app;
module.exports.handler = serverless(app);
//const express = require("express");
//const serverless = require("serverless-http");
//
//const app = require("./scr/app");
//
//module.exports = app;
//module.exports.handler = serverless(app);
//
//if (process.env.NODE_ENV !== "production") {
//  const PORT = process.env.PORT || 5000;
//  app.listen(PORT, () => {
//    console.log(`Server running on http://localhost:${PORT}`);
//  });
//}
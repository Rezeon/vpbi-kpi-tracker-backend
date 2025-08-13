const serverless = require("serverless-http");
const app = require("./scr/app"); 
module.exports = serverless(app);

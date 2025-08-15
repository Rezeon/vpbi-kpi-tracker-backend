const { authRequest, requireRole } = require("../middleware/middleware");
const { authLimiter } = require('../utils/ratelimiter')

function publicProcedure(route) {
  return [authRequest, route];
}

function adminProcedure(route) {
  return [authRequest, requireRole("admin"), route];
}

module.exports = { publicProcedure, adminProcedure };

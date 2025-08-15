const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 2000, 
  max: 10, 
  message: {
    status: 429,
    message: "Terlalu banyak percobaan. Coba lagi nanti.",
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

module.exports = { authLimiter };

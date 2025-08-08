const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    message: "Terlalu banyak percobaan login. Coba lagi nanti.",
  },
});

module.exports = { loginLimiter };
const { getAuth } = require('@clerk/express');

require("dotenv").config();

const authRequest = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const { sessionClaims } = getAuth(req);

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    if (!sessionClaims) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { sub: clerkId, email, username } = sessionClaims;

    req.user = {
      username: username,
      clerkId: clerkId,
      email: email,
    };
    console.log(req.user);
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

const requireRole = (role) => {
  return async (req, res, next) => {
    const { clerkId } = req.user;
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
      select: {
        role: true,
        clerkId: true,
      },
    });
    if (user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};

module.exports = { authRequest, requireRole };

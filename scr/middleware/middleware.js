const { getAuth } = require('@clerk/express');
const prisma = require("../config/prisma");
require("dotenv").config();

const authRequest = async (req, res, next) => {
  try {
    const { sessionClaims } = getAuth(req);

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

const requireRole = (roles) => {
  return async (req, res, next) => {
    const { clerkId } = req.user;
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { role: true, id: true }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = { ...req.user, id: user.id };
    next();
  };
};


module.exports = { authRequest, requireRole };
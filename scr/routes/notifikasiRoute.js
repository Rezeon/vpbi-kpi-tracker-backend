const express = require("express");
const router = express.Router();
const { publicProcedure, leaderProcedure } = require("../utils/procedure");
const {
  createNotifikasi,
  getUserNotifikasi,
  markAsRead,
} = require("../controllers/notifikasiContrller");

router.post("/createNotifikasi", ...leaderProcedure(createNotifikasi)); // akses umum
router.patch("/markAsRead/:id", ...publicProcedure(markAsRead));
router.get("/:userId", ...publicProcedure(getUserNotifikasi));

module.exports = router;

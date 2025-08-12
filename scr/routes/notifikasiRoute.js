const express = require("express");
const router = express.Router();
const { publicProcedure, adminProcedure } = require("../utils/procedure");
const {
  createNotifikasi,
  getUserNotifikasi,
  markAsRead,
} = require("../controllers/notifikasiContrller");

router.post("/createNotifikasi", ...adminProcedure(createNotifikasi)); // akses umum
router.patch("/markAsRead/:id", ...publicProcedure(markAsRead));
router.get("/:userId", ...publicProcedure(getUserNotifikasi));

module.exports = router;

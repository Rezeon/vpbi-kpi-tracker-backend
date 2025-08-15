const express = require("express");
const router = express.Router();
const { publicProcedure, leaderProcedure } = require("../utils/procedure");
const {
  addLaporanKpi,
  getAllLaporan,
  getLaporanById,
  updateLaporanKpi,
  deleteLaporanKpi,
} = require("../controllers/laporanKpiController");

router.post("/add", ...leaderProcedure(addLaporanKpi)); // akses umum
router.patch("/update", ...leaderProcedure(updateLaporanKpi));
router.get("/all", ...publicProcedure(getAllLaporan));
router.get(`/:id`, ...publicProcedure(getLaporanById));
router.delete("/delete", ...leaderProcedure(deleteLaporanKpi));

module.exports = router;

const express = require("express");
const router = express.Router();
const { publicProcedure, adminProcedure } = require("../utils/procedure");
const {
  addLaporanKpi,
  getAllLaporan,
  getLaporanById,
  updateLaporanKpi,
  deleteLaporanKpi,
} = require("../controllers/laporanKpiController");

router.post("/add", ...publicProcedure(addLaporanKpi)); // akses umum
router.patch("/update", ...publicProcedure(updateLaporanKpi));
router.get("/all", ...publicProcedure(getAllLaporan));
router.get(`/:id`, ...publicProcedure(getLaporanById));
router.delete("/delete", ...adminProcedure(deleteLaporanKpi));

module.exports = router;

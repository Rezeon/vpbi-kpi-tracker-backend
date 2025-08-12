const express = require("express");
const router = express.Router();
const { publicProcedure, adminProcedure } = require("../utils/procedure");
const {
  addPenilaianKpi,
  getAllPenilaianKpi,
  getPenilaianKpiById,
  updatePenilaianKpi,
  deletePenilaianKpi,
} = require("../controllers/penilaianKpi");

router.post("/add", ...adminProcedure(addPenilaianKpi)); // akses umum
router.patch("/update", ...adminProcedure(updatePenilaianKpi));
router.get("/all", ...publicProcedure(getAllPenilaianKpi));
router.get("/:id", ...publicProcedure(getPenilaianKpiById));
router.delete("/delete/penilaianKPi", ...adminProcedure(deletePenilaianKpi));

module.exports = router;

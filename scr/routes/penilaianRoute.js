const express = require("express");
const router = express.Router();
const { publicProcedure, leaderProcedure } = require("../utils/procedure");
const {
  addPenilaianKpi,
  getAllPenilaianKpi,
  getPenilaianKpiById,
  updatePenilaianKpi,
  deletePenilaianKpi,
} = require("../controllers/penilaianKpi");

router.post("/add", ...leaderProcedure(addPenilaianKpi)); // akses umum
router.patch("/update/:id", ...leaderProcedure(updatePenilaianKpi));
router.get("/all", ...publicProcedure(getAllPenilaianKpi));
router.get("/:id", ...publicProcedure(getPenilaianKpiById));
router.delete("/delete/:id", ...leaderProcedure(deletePenilaianKpi));

module.exports = router;

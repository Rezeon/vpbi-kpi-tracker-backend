const express = require("express");
const router = express.Router();
const { publicProcedure, leaderProcedure } = require("../utils/procedure");
const {
  addMatriksKpi,
  getAllMatriksKpi,
  getMatriksKpiById,
  updateMatriksKpi,
  deleteMatriksKpi
} = require("../controllers/matriksKpiContoller");

router.post("/add", ...leaderProcedure(addMatriksKpi)); // akses umum
router.patch("/update", ...leaderProcedure(updateMatriksKpi)); 
router.get("/all", ...publicProcedure(getAllMatriksKpi)); 
router.get("/:id", ...publicProcedure(getMatriksKpiById)); 
router.delete("/delete/:id", ...leaderProcedure(deleteMatriksKpi)); 

module.exports = router;

const express = require("express");
const router = express.Router();
const { publicProcedure, adminProcedure } = require("../utils/procedure");
const {
  addMatriksKpi,
  getAllMatriksKpi,
  getMatriksKpiById,
  updateMatriksKpi,
  deleteMatriksKpi
} = require("../controllers/matriksKpiContoller");

router.post("/add", ...adminProcedure(addMatriksKpi)); // akses umum
router.patch("/update", ...adminProcedure(updateMatriksKpi)); 
router.get("/all", ...publicProcedure(getAllMatriksKpi)); 
router.get("/:id", ...publicProcedure(getMatriksKpiById)); 
router.delete("/delete/matrik", ...adminProcedure(deleteMatriksKpi)); 

module.exports = router;

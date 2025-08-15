const express = require("express");
const router = express.Router();
const { publicProcedure, adminProcedure } = require("../utils/procedure");
const {
  addBuktiKpi,
  getAllBuktiKpi,
  getBuktiKpiById,
  updateBuktiKpi,
  deleteBuktiKpi,
} = require("../controllers/buktiKpiController");

router.post("/add", ...publicProcedure(addBuktiKpi)); // akses umum
router.patch("/update/:id", ...adminProcedure(updateBuktiKpi));
router.get("/all", ...publicProcedure(getAllBuktiKpi));
router.get(`/:id`, ...publicProcedure(getBuktiKpiById));
router.delete("/delete/:id", ...publicProcedure(deleteBuktiKpi));

module.exports = router;

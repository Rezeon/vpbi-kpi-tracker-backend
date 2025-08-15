const express = require("express");
const router = express.Router();
const { publicProcedure, adminProcedure } = require("../utils/procedure");
const {
  addDivisi,
  updateDivisi,
  getAllDivisi,
  getDivisiById,
  deleteDivisi
} = require("../controllers/divisiController");

router.post("/add", ...adminProcedure(addDivisi)); // akses umum
router.patch("/update", ...adminProcedure(updateDivisi)); 
router.get("/all", ...publicProcedure(getAllDivisi)); 
router.get(`/:id`, ...publicProcedure(getDivisiById)); 
router.delete("/delete", ...adminProcedure(deleteDivisi)); 

module.exports = router;

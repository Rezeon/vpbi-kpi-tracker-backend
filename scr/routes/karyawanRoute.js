const express = require("express");
const router = express.Router();
const { publicProcedure, adminProcedure } = require("../utils/procedure");
const {
  addKaryawan,
  getAllKaryawan,
  getbyId,
  updateKaryawan,
  deleteKaryawan,
} = require("../controllers/karyawanController");

router.post("/add", ...adminProcedure(addKaryawan)); // akses umum
router.patch("/update", ...adminProcedure(updateKaryawan));
router.get("/all", ...publicProcedure(getAllKaryawan));
router.get(`/:id`, ...publicProcedure(getbyId));
router.delete("/delete/karyawan", ...adminProcedure(deleteKaryawan));

module.exports = router;

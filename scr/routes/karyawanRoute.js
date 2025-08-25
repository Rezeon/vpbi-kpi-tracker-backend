const express = require("express");
const router = express.Router();
const { publicProcedure, leaderProcedure } = require("../utils/procedure");
const {
  addKaryawan,
  getAllKaryawan,
  getKaryawanbyId,
  updateKaryawan,
  deleteKaryawan,
} = require("../controllers/karyawanController");

router.post("/add", ...leaderProcedure(addKaryawan)); // akses umum
router.patch("/update", ...leaderProcedure(updateKaryawan));
router.get("/all", ...publicProcedure(getAllKaryawan));
router.get(`/:id`, ...publicProcedure(getKaryawanbyId));
router.delete("/delete/:id", ...leaderProcedure(deleteKaryawan));

module.exports = router;

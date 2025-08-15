const express = require("express");
const router = express.Router();
const { publicProcedure, adminProcedure } = require("../utils/procedure");
const {
  addDetailKpi,
  getAllDetail,
  getDetailById,
  updateDetailKpi,
  deleteDetailKpi,
} = require("../controllers/detailkpiController");

router.post("/add", ...adminProcedure(addDetailKpi)); // akses umum
router.patch("/update", ...adminProcedure(updateDetailKpi));
router.get("/all", ...publicProcedure(getAllDetail));
router.get(`/:id`, ...publicProcedure(getDetailById));
router.delete("/delete", ...adminProcedure(deleteDetailKpi));

module.exports = router;

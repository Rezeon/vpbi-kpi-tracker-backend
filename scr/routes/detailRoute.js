const express = require("express");
const router = express.Router();
const { publicProcedure, leaderProcedure } = require("../utils/procedure");
const {
  addDetailKpi,
  getAllDetail,
  getDetailById,
  updateDetailKpi,
  deleteDetailKpi,
} = require("../controllers/detailkpiController");

router.post("/add", ...leaderProcedure(addDetailKpi)); // akses umum
router.patch("/update", ...leaderProcedure(updateDetailKpi));
router.get("/all", ...publicProcedure(getAllDetail));
router.get(`/:id`, ...publicProcedure(getDetailById));
router.delete("/delete", ...leaderProcedure(deleteDetailKpi));

module.exports = router;

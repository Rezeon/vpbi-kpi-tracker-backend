const express = require("express");
const router = express.Router();
const { publicProcedure, adminProcedure } = require("../utils/procedure");
const { createUser } = require("../controllers/userController");

router.post("/register", ...publicProcedure(createUser)); // akses umum
router.post("/admin/register", ...adminProcedure(createUser)); // hanya admin

module.exports = router;

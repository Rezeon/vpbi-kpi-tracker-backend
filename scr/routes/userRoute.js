const express = require("express");
const router = express.Router();
const { adminProcedure, publicProcedure } = require("../utils/procedure");
const {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/register", ...publicProcedure(createUser)); // akses umum
router.patch("/update", ...adminProcedure(updateUser)); 
router.get("/all", ...publicProcedure(getAllUser)); 
router.get("/:id", ...publicProcedure(getUserById)); 
router.delete("/delete/user", ...adminProcedure(deleteUser)); 


module.exports = router;

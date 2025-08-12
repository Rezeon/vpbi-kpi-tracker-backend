const express = require("express");
const router = express.Router();
const { publicProcedure, adminProcedure } = require("../utils/procedure");
const {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/register", ...publicProcedure(createUser)); // akses umum
router.patch("/update", ...publicProcedure(updateUser)); 
router.get("/AllUser", ...publicProcedure(getAllUser)); 
router.get("/UserById", ...publicProcedure(getUserById)); 
router.delete("/delete/user", ...publicProcedure(deleteUser)); 


module.exports = router;

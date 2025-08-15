const express = require("express");
const router = express.Router();
const { adminProcedure } = require("../utils/procedure");
const {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/register", ...adminProcedure(createUser)); // akses umum
router.patch("/update", ...adminProcedure(updateUser)); 
router.get("/AllUser", ...adminProcedure(getAllUser)); 
router.get("/UserById", ...adminProcedure(getUserById)); 
router.delete("/delete/user", ...adminProcedure(deleteUser)); 


module.exports = router;

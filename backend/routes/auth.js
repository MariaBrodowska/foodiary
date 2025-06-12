const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserStatus,
  logoutUser,
} = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/status", getUserStatus);
router.post("/logout", logoutUser);

module.exports = router;

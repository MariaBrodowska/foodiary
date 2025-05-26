const express = require("express");
const router = express.Router();

const { loginUser, registerUser, getUserStatus } = require("../controllers/authController")
const requireAuth = require("../middleware/requireAuth");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post("/login", loginUser)
router.post("/register", registerUser)
router.get("/status", getUserStatus);

router.get('/dashboard', requireAuth, (req, res) => {
    res.status(200).json({ message: "Strona główna użytkownika", user: req.user });
});

module.exports = router;

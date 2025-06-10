const express = require("express");
const router = express.Router();

const { loginUser, registerUser, getUserStatus, logoutUser, getUserEmail, getUserData, addShoppingItem } = require("../controllers/authController")
const requireAuth = require("../middleware/requireAuth");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post("/login", loginUser)
router.post("/register", registerUser)
router.get("/status", getUserStatus);
router.post("/logout", logoutUser);
router.get("/email", getUserEmail);
router.get("/userData", getUserData);
router.get("/addItem", addShoppingItem);

router.get("/check", requireAuth, (req, res) => {
    console.log('Sprawdzanie statusu użytkownik');
    res.status(200).json({ isAuthenticated: true, user: req.user });
});

router.get('/dashboard', requireAuth, (req, res) => {
    res.status(200).json({ message: "Strona główna użytkownika", user: req.user });
});

module.exports = router;

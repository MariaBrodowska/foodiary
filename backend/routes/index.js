const express = require("express");
const router = express.Router();

router.use("/user", require("./auth"));
router.use("/user", require("./user"));
router.use("/shopping", require("./shopping"));
router.use("/my-plans", require("./myPlans"));
router.use("/favorite-meal-plans", require("./favoritePlans"));

module.exports = router;

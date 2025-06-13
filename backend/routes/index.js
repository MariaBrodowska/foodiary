const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/requireAuth");

router.use("/", require("./auth"));
router.use("/", requireAuth, require("./user"));
router.use("/shopping", requireAuth, require("./shopping"));
router.use("/my-plans", requireAuth, require("./myPlans"));
router.use("/favorite-meal-plans", requireAuth, require("./favouritePlans"));

module.exports = router;

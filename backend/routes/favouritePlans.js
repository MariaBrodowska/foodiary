const express = require("express");
const router = express.Router();
const {
  addFavoritePlan,
  removeFavoritePlan,
  getFavoritePlans,
} = require("../controllers/favoritePlansController");
// const { requireAuth } = require("../middleware/requireAuth");

// router.use(requireAuth);

router.post("/", addFavoritePlan);
router.get("/", getFavoritePlans);
router.delete("/:planId", removeFavoritePlan);

module.exports = router;

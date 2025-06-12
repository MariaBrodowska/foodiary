const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/requireAuth");
const {
  getShoppingItems,
  addShoppingItem,
  togglePurchased,
  deleteShoppingItem,
  clearPurchased,
} = require("../controllers/shoppingController");

router.use(requireAuth);

router.get("/", getShoppingItems);
router.post("/", addShoppingItem);
router.patch("/:id/toggle", togglePurchased);
router.delete("/:id", deleteShoppingItem);
router.delete("/purchased/clear", clearPurchased);

module.exports = router;

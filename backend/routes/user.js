const express = require("express");
const router = express.Router();
const {
  getUserEmail,
  getUserData,
  addShoppingItem,
  deactivateAccount,
  updateUserData,
  changePassword,
} = require("../controllers/userController");
// const { requireAuth } = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/email", getUserEmail);
router.get("/userData", getUserData);
router.get("/addItem", addShoppingItem);
router.post("/deactivate", deactivateAccount);
router.put("/profile", updateUserData);
router.put("/change-password", changePassword);

//sprawdzenie autoryzacji
router.get("/check", (req, res) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
});

router.get("/dashboard", (req, res) => {
  res
    .status(200)
    .json({ message: "Strona główna użytkownika", user: req.user });
});

module.exports = router;

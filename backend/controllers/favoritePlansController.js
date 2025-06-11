const FavoritePlan = require("../models/FavoritePlan");
const jwt = require("jsonwebtoken");

const getUserIdFromToken = (req) => {
  const token = req.cookies.token;
  if (!token) {
    throw new Error("Nie zalogowany");
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken._id;
};

const addFavoritePlan = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { planData } = req.body;

    if (!planData || !planData.id) {
      return res.status(400).json({ error: "Nieprawidłowe dane planu" });
    }

    await FavoritePlan.addFavorite(userId, planData);
    res.status(200).json({ message: "Plan dodany do ulubionych" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeFavoritePlan = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { planId } = req.params;

    await FavoritePlan.removeFavorite(userId, planId);
    res.status(200).json({ message: "Plan usunięty z ulubionych" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFavoritePlans = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const favoritePlans = await FavoritePlan.getUserFavorites(userId);
    res.status(200).json({ favoritePlans });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addFavoritePlan,
  removeFavoritePlan,
  getFavoritePlans,
};

const FavoritePlan = require("../models/FavoritePlan");
const { getUserIdFromToken } = require("../middleware/requireAuth");

const addFavoritePlan = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { planData } = req.body;

    if (!planData || !planData.id) {
      return res.status(400).json({ error: "Nieprawidłowe dane planu" });
    }
    console.log(planData);
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

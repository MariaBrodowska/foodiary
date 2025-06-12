const mongoose = require("mongoose");

const favoritePlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  planId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  diets: String,
  meals: [
    {
      id: Number,
      title: String,
      image: String,
      readyInMinutes: Number,
      sourceUrl: String,
    },
  ],
  nutrition: {
    calories: Number,
    protein: Number,
    fat: Number,
    carbohydrates: Number,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

favoritePlanSchema.index({ userId: 1, planId: 1 }, { unique: true });

favoritePlanSchema.statics.addFavorite = async function (userId, planData) {
  const currentDate = new Date();
  const dateStr = new Date().toISOString().slice(0, 10);

  const calories = planData.nutrition.calories;
  const dietType = planData.diets ? planData.diets.join(", ") : "Ogólny";

  const name = `Plan ${calories} kcal - ${dietType} (${dateStr})`;

  const favoriteData = {
    userId,
    planId: planData.id || planData.planId,
    name: name,
    diets: dietType,
    meals: planData.meals,
    nutrition: {
      calories: planData.nutrition.calories,
      protein: planData.nutrition.protein,
      fat: planData.nutrition.fat,
      carbohydrates: planData.nutrition.carbohydrates,
    },
  };

  return await this.create(favoriteData);
};

favoritePlanSchema.statics.removeFavorite = async function (userId, planId) {
  return await this.deleteOne({ userId, planId });
};

favoritePlanSchema.statics.getUserFavorites = async function (userId) {
  return await this.find({ userId }).sort({ addedAt: -1 });
};

module.exports = mongoose.model("FavoritePlan", favoritePlanSchema);

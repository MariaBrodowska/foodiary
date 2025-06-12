const mongoose = require("mongoose");

const myPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Nazwa planu musi mieć co najmniej 3 znaki"],
    maxlength: [100, "Nazwa planu jest za długa"],
  },
  breakfast: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Śniadanie musi mieć co najmniej 3 znaki"],
    maxlength: [1000, "Śniadanie jest za długie"],
  },
  lunch: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Obiad musi mieć co najmniej 3 znaki"],
    maxlength: [1000, "Obiad jest za długi"],
  },
  dinner: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Kolacja musi mieć co najmniej 3 znaki"],
    maxlength: [1000, "Kolacja jest za długa"],
  },
  breakfastImage: {
    type: String,
    default: null,
  },
  lunchImage: {
    type: String,
    default: null,
  },
  dinnerImage: {
    type: String,
    default: null,
  },
  dailyCalories: {
    type: Number,
    min: [800, "Dzienne kalorie muszą być co najmniej 800"],
    max: [5000, "Dzienne kalorie nie mogą przekraczać 5000"],
  },
  dietType: {
    type: String,
    enum: [
      "vegetarian",
      "vegan",
      "ketogenic",
      "paleo",
      "gluten free",
      "pescetarian",
      "primal",
      "",
    ],
    default: "",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

myPlanSchema.statics.createPlan = async function (userId, data) {
  const requiredFields = ["name", "breakfast", "lunch", "dinner"];
  for (const field of requiredFields) {
    if (!data[field]) throw Error(`${field} jest wymagane`);
  }

  return await this.create({
    userId,
    name: data.name.trim(),
    breakfast: data.breakfast.trim(),
    lunch: data.lunch.trim(),
    dinner: data.dinner.trim(),
    breakfastImage: data.breakfastImage || null,
    lunchImage: data.lunchImage || null,
    dinnerImage: data.dinnerImage || null,
    dailyCalories: data.dailyCalories || null,
    dietType: data.dietType || "",
  });
};

myPlanSchema.statics.getUserPlans = async function (userId, search = "") {
  const query = {
    userId,
    ...(search && { name: { $regex: search, $options: "i" } }),
  };
  return await this.find(query).sort({ createdAt: -1 });
};

myPlanSchema.statics.updatePlan = async function (planId, userId, updates) {
  const plan = await this.findOne({ _id: planId, userId });
  if (!plan) throw Error("Plan nie został znaleziony");

  for (const key of Object.keys(updates)) {
    const value = updates[key];
    plan[key] =
      typeof value === "string" && !key.includes("Image")
        ? value.trim()
        : value;
  }
  plan.updatedAt = Date.now();
  await plan.save();
  return plan;
};

myPlanSchema.statics.deletePlan = async function (planId, userId) {
  const result = await this.deleteOne({ _id: planId, userId });
  return result;
};

module.exports = mongoose.model("MyPlan", myPlanSchema);

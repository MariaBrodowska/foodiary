const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Email nie jest prawidłowy",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: "Hasło nie jest wystarczająco silne",
    },
  },
  sex: {
    type: String,
    required: true,
    enum: ["female", "male"],
    message: "Wybierz poprawną płeć",
  },
  activity: {
    type: String,
    required: true,
    enum: ["high", "moderate", "low"],
    message: "Wybierz poprawny poziom aktywności",
  },
  height: {
    type: Number,
    required: true,
    min: [0, "Wzrost musi być większy niż 0"],
  },
  weight: {
    type: Number,
    required: true,
    min: [0, "Waga musi być większa niż 0"],
  },
  goal: {
    type: String,
    required: true,
    enum: ["maintainWeight", "loseWeight", "gainWeight"],
    message: "Wybierz poprawny cel",
  },
  age: {
    type: Number,
    required: true,
    min: [0, "Wiek musi być większy niż 13"],
  },
  additionalData: {
    tdee: { type: Number },
    targetCalories: { type: Number },
    waterIntake: { type: Number },
  },
  shoppingList: [
    {
      product: { type: String, required: true },
      quantity: { type: String, required: true },
      purchased: { type: Boolean, default: false },
    },
  ],
});

userSchema.statics.register = async function (
  email,
  password,
  sex,
  activity,
  height,
  weight,
  goal,
  age
) {
  if (
    !email ||
    !password ||
    !sex ||
    !activity ||
    !height ||
    !weight ||
    !goal ||
    !age
  ) {
    throw Error("Wszystkie pola muszą być uzupełnione");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email jest już używany");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const userData = {
    email,
    password: hash,
    sex,
    activity,
    height,
    weight,
    goal,
    age,
  };

  let bmr;
  if (sex === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let activityMultiplier;
  switch (activity) {
    case "high":
      activityMultiplier = 1.9;
      break;
    case "moderate":
      activityMultiplier = 1.55;
      break;
    case "low":
      activityMultiplier = 1.2;
      break;
    default:
      activityMultiplier = 1.2;
  }
  const tdee = bmr * activityMultiplier;

  let targetCalories;
  switch (goal) {
    case "maintainWeight":
      targetCalories = tdee;
      break;
    case "loseWeight":
      targetCalories = tdee - 500;
      break;
    case "gainWeight":
      targetCalories = tdee + 500;
      break;
    default:
      targetCalories = tdee;
  }

  const waterIntake = weight * 35;

  userData.additionalData = {
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    waterIntake: Math.round(waterIntake),
  };

  const user = await this.create(userData);
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Wszystkie pola muszą być uzupełnione");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email nie jest używany");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Hasło nie jest prawidłowe");
  }
  return user;
};

userSchema.methods.calculateAdditionalData = function () {
  const { sex, activity, height, weight, goal, age } = this;

  let bmr;
  if (sex === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let activityMultiplier;
  switch (activity) {
    case "high":
      activityMultiplier = 1.9;
      break;
    case "moderate":
      activityMultiplier = 1.55;
      break;
    case "low":
      activityMultiplier = 1.2;
      break;
    default:
      activityMultiplier = 1.2;
  }

  const tdee = bmr * activityMultiplier;

  let targetCalories;
  switch (goal) {
    case "maintainWeight":
      targetCalories = tdee;
      break;
    case "loseWeight":
      targetCalories = tdee - 500;
      break;
    case "gainWeight":
      targetCalories = tdee + 500;
      break;
    default:
      targetCalories = tdee;
  }

  const waterIntake = weight * 35;

  this.additionalData = {
    tdee,
    targetCalories,
    waterIntake,
  };
};

userSchema.statics.updateUser = async function (id, updates) {
  const allowedUpdates = [
    "email",
    "password",
    "sex",
    "activity",
    "height",
    "weight",
    "goal",
    "age",
  ];
  const keys = Object.keys(updates);

  const isValidOperation = keys.every((key) => allowedUpdates.includes(key));
  if (!isValidOperation) {
    throw Error("Nieprawidłowe pola do aktualizacji");
  }

  const user = await this.findById(id);
  if (!user) {
    throw Error("Użytkownik nie został znaleziony");
  }

  for (const key of keys) {
    if (key === "password") {
      const salt = await bcrypt.genSalt(10);
      user[key] = await bcrypt.hash(updates[key], salt);
    } else {
      user[key] = updates[key];
    }
  }

  if (
    keys.some((key) =>
      ["sex", "activity", "height", "weight", "goal", "age"].includes(key)
    )
  ) {
    const { sex, activity, height, weight, goal, age } = user;

    let bmr;
    if (sex === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let activityMultiplier;
    switch (activity) {
      case "high":
        activityMultiplier = 1.9;
        break;
      case "moderate":
        activityMultiplier = 1.55;
        break;
      case "low":
        activityMultiplier = 1.2;
        break;
      default:
        activityMultiplier = 1.2;
    }
    const tdee = bmr * activityMultiplier;

    let targetCalories;
    switch (goal) {
      case "maintainWeight":
        targetCalories = tdee;
        break;
      case "loseWeight":
        targetCalories = tdee - 500;
        break;
      case "gainWeight":
        targetCalories = tdee + 500;
        break;
      default:
        targetCalories = tdee;
    }

    const waterIntake = weight * 35;

    user.additionalData = {
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      waterIntake: Math.round(waterIntake),
    };
  }

  await user.save();
  return user;
};

userSchema.statics.addShoppingItem = async function (
  userId,
  product,
  quantity
) {
  if (!product || !quantity) {
    throw Error("Nazwa produktu i ilość są wymagane");
  }
  const user = await this.findById(userId);
  if (!user) {
    throw Error("Użytkownik nie został znaleziony");
  }

  user.shoppingList.push({
    product,
    quantity,
    purchased: false,
  });
  await user.save();
  return user;
};

module.exports = mongoose.model("User", userSchema);

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
  isActive: {
    type: Boolean,
    default: true,
  },
  sex: {
    type: String,
    required: [true, "Płeć jest wymagana"],
    enum: {
      values: ["female", "male"],
      message: "Wybierz poprawną płeć",
    },
  },
  activity: {
    type: String,
    required: [true, "Aktywność jest wymagana"],
    enum: {
      values: ["high", "moderate", "low"],
      message: "Wybierz poprawny poziom aktywności",
    },
  },
  height: {
    type: Number,
    required: [true, "Wzrost jest wymagany"],
    min: [100, "Wzrost musi być większy niż 100 cm"],
    max: [250, "Wzrost nie może być większy niż 250 cm"],
  },
  weight: {
    type: Number,
    required: [true, "Waga jest wymagana"],
    min: [30, "Waga musi być większa niż 30 kg"],
    max: [300, "Waga nie może być większa niż 300 kg"],
  },
  goal: {
    type: String,
    required: [true, "Cel jest wymagany"],
    enum: {
      values: ["maintainWeight", "loseWeight", "gainWeight"],
      message: "Wybierz poprawny cel",
    },
  },
  age: {
    type: Number,
    required: [true, "Wiek jest wymagany"],
    min: [13, "Wiek musi być większy niż 13"],
    max: [120, "Wiek nie może być większy niż 120"],
  },
  additionalData: {
    tdee: { type: Number },
    targetCalories: { type: Number },
    waterIntake: { type: Number },
  },
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

  const user = new this(userData);
  user.calculateAdditionalData();
  await user.save();
  return user;
};

userSchema.methods.calculateAdditionalData = function () {
  //obliczenie dodatkowych inf
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

  const tdee = bmr * activityMultiplier; //zapotrzebowanie kaloryczne zalezne od płci, wagi, wzrostu, wieku i aktywnosci

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
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    waterIntake: Math.round(waterIntake),
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
    user.calculateAdditionalData();
  }

  await user.save();
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Wszystkie pola muszą być uzupełnione");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Nieprawidłowy email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Nieprawidłowe hasło");
  }

  if (!user.isActive) {
    throw Error("Konto zostało dezaktywowane");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);

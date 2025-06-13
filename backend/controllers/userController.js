const User = require("../models/User");
const { getUserIdFromToken } = require("../middleware/requireAuth");

const getUserEmail = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findById(userId).select("email");
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }
    console.log("Zwracanie emaila użytkownika:", user.email);
    res.status(200).json({
      email: user.email,
    });
  } catch (error) {
    console.error("Błąd weryfikacji tokenu:", error);
    res.status(401).json({ message: "Sesja wygasła lub nieprawidłowy token" });
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    console.log("Zwracanie danych użytkownika:", user.email);
    res.status(200).json({
      email: user.email,
      sex: user.sex,
      activity: user.activity,
      height: user.height,
      weight: user.weight,
      goal: user.goal,
      age: user.age,
      additionalData: user.additionalData,
    });
  } catch (error) {
    console.error("Błąd weryfikacji tokenu:", error);
    res.status(401).json({ message: "Sesja wygasła lub nieprawidłowy token" });
  }
};

const getShoppingList = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    console.log("Zwracanie listy zakupów:", user.email);
    res.status(200).json({
      additionalData: user.shoppingList,
    });
  } catch (error) {
    console.error("Błąd weryfikacji tokenu:", error);
    res.status(401).json({ message: "Sesja wygasła lub nieprawidłowy token" });
  }
};

const addShoppingItem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { product, quantity } = req.body;
    const user = await User.addShoppingItem(userId, product, quantity);
    res.status(200).json({ message: "Dodano produkt" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deactivateAccount = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    console.log("Konto zostało dezaktywowane:", user.email);
    res.status(200).json({ message: "Konto zostało dezaktywowane" });
  } catch (error) {
    console.error("Błąd dezaktywacji konta:", error);
    res.status(500).json({ error: "Wystąpił błąd podczas dezaktywacji konta" });
  }
};

const updateUserData = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const updates = req.body;

    // Walidacja danych
    const allowedUpdates = [
      "email",
      "sex",
      "activity",
      "height",
      "weight",
      "goal",
      "age",
    ];
    const updateKeys = Object.keys(updates);
    const isValidOperation = updateKeys.every((key) =>
      allowedUpdates.includes(key)
    );

    if (!isValidOperation) {
      return res
        .status(400)
        .json({ error: "Nieprawidłowe pola do aktualizacji" });
    }

    const updatedUser = await User.updateUser(userId, updates);

    res.status(200).json({
      message: "Dane użytkownika zostały zaktualizowane",
      user: {
        email: updatedUser.email,
        sex: updatedUser.sex,
        activity: updatedUser.activity,
        height: updatedUser.height,
        weight: updatedUser.weight,
        goal: updatedUser.goal,
        age: updatedUser.age,
        additionalData: updatedUser.additionalData,
      },
    });
  } catch (error) {
    console.error("Błąd aktualizacji danych użytkownika:", error);
    if (error.name === "ValidationError") {
      const fieldErrors = {};

      //walidacja
      Object.keys(error.errors).forEach((field) => {
        fieldErrors[field] = error.errors[field].message;
      });

      return res.status(400).json({
        error: "Błędy walidacji",
        fieldErrors: fieldErrors,
      });
    }

    //email juz uzywany
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Email jest już używany",
        fieldErrors: { email: "Email jest już używany" },
      });
    }

    res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        error: "Nowe hasło jest wymagane",
        fieldErrors: { newPassword: "Nowe hasło jest wymagane" },
      });
    }

    // Użyj funkcji updateUser która ma już walidację hasła
    const updatedUser = await User.updateUser(userId, {
      password: newPassword,
    });

    res.status(200).json({
      message: "Hasło zostało pomyślnie zmienione",
    });
  } catch (error) {
    console.error("Błąd zmiany hasła:", error);

    // Obsługa błędów walidacji Mongoose
    if (error.name === "ValidationError") {
      const fieldErrors = {};

      Object.keys(error.errors).forEach((field) => {
        fieldErrors[field] = error.errors[field].message;
      });

      return res.status(400).json({
        error: "Błędy walidacji",
        fieldErrors: fieldErrors,
      });
    }

    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserEmail,
  getUserData,
  getShoppingList,
  addShoppingItem,
  deactivateAccount,
  updateUserData,
  changePassword,
};

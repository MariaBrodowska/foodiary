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

module.exports = {
  getUserEmail,
  getUserData,
  getShoppingList,
  addShoppingItem,
  deactivateAccount,
};

const ShoppingItem = require("../models/ShoppingItem");
const jwt = require("jsonwebtoken");

const getShoppingItems = async (req, res) => {
  try {
    const items = await ShoppingItem.find({ user_id: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas pobierania listy zakupów" });
  }
};

const addShoppingItem = async (req, res) => {
  const { product, quantity } = req.body;
  if (!product || !quantity) {
    return res.status(400).json({ error: "Produkt i ilość są wymagane" });
  }
  try {
    const newItem = new ShoppingItem({
      user_id: req.user._id,
      product,
      quantity,
      purchased: false,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error saving item:", error);

    //walidacja
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        error: validationErrors.join(". "),
      });
    }
    res.status(500).json({ error: "Błąd podczas dodawania produktu" });
  }
};

const togglePurchased = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await ShoppingItem.findOne({ _id: id, user_id: req.user._id });
    if (!item) {
      return res.status(404).json({ error: "Element nie został znaleziony" });
    }

    item.purchased = !item.purchased;
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas aktualizacji elementu" });
  }
};

const deleteShoppingItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await ShoppingItem.findOneAndDelete({
      _id: id,
      user_id: req.user._id,
    });
    if (!deletedItem) {
      return res.status(404).json({ error: "Element nie został znaleziony" });
    }
    res.status(200).json({ message: "Element został usunięty" });
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas usuwania elementu" });
  }
};

//usun wszystkie kupione
const clearPurchased = async (req, res) => {
  try {
    await ShoppingItem.deleteMany({ user_id: req.user._id, purchased: true });
    res.status(200).json({ message: "Kupione elementy zostały usunięte" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Błąd podczas usuwania kupionych elementów" });
  }
};

module.exports = {
  getShoppingItems,
  addShoppingItem,
  togglePurchased,
  deleteShoppingItem,
  clearPurchased,
};

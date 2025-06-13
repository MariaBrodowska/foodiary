const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

//pobieranie id uzytkownika z tokenu
const getUserIdFromToken = (req) => {
  const token = req.cookies.token;
  if (!token) {
    throw new Error("Nie zalogowany");
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken._id;
};

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("RequireAuth - No token found");
      clear.Cookie("token");
      location.reload();
      return res.status(401).json({ error: "Wymagane uwierzytelnienie" });
    }
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    clear.Cookie("token");
    location.reload();
    res.status(401).json({ error: "Żądanie nie jest autoryzowane" });
  }
};

module.exports = { requireAuth, getUserIdFromToken };

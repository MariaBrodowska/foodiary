const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({ message: "Logowanie udane", email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { email, password, sex, activity, height, weight, goal, age } =
    req.body;
  try {
    const user = await User.register(
      email,
      password,
      sex,
      activity,
      height,
      weight,
      goal,
      age
    );
    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({ message: "Rejestracja udana", email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserStatus = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Nie zalogowany" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken._id);
    return res.status(200).json({
      isAuthenticated: true,
      userId: user._id,
    });
  } catch (error) {
    console.error("Błąd weryfikacji tokenu:", error);
    res.status(401).json({ message: "Sesja wygasła lub nieprawidłowy token" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Wylogowano pomyślnie" });
  } catch (error) {
    console.error("Błąd podczas wylogowywania:", error);
    res.status(500).json({ error: "Wystąpił błąd podczas wylogowywania" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserStatus,
  logoutUser,
};

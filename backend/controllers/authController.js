const User = require("../models/User");
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'});
}

const loginUser = async (req, res) => {
    res.json({mssg: "Użytkownik zalogowany"});
}

const registerUser = async (req, res) => {
    const {email, password, sex, activity, height, weight} = req.body;

    try {
        const user = await User.register(email, password, sex, activity, height, weight);

        const token = createToken(user._id);
        res.status(200).json({ message: "Rejestracja udana", email, token});
    } catch (error){
        // console.error(error);
        res.status(400).json({error: error.message});
    }
}

module.exports = { loginUser, registerUser}
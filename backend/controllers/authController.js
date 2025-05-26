const User = require("../models/User");
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'});
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });
        
        res.status(200).json({message: "Logowanie udane", email});
    } catch (error){
        res.status(400).json({error: error.message});
    }
}
 
const registerUser = async (req, res) => {
    const {email, password, sex, activity, height, weight} = req.body;

    try {
        const user = await User.register(email, password, sex, activity, height, weight);

        const token = createToken(user._id);
        res.status(200).json({ message: "Rejestracja udana", email, token});
    } catch (error){
        res.status(400).json({error: error.message});
    }
}

const getUserStatus = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Nie zalogowany" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken._id);
        if (!user) {
            return res.status(401).json({ message: "Użytkownik nie istnieje" });
        }
                res.status(200).json({
            id: user._id,
            email: user.email,
            sex: user.sex,
            activity: user.activity,
            height: user.height,
            weight: user.weight
        });
    } catch (error) {
        console.error('Błąd weryfikacji tokenu:', error);
        res.status(401).json({ message: "Sesja wygasła lub nieprawidłowy token" });
    }
};

module.exports = { loginUser, registerUser, getUserStatus }
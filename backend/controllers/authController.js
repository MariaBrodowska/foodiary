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
            maxAge: 3600000,
            sameSite: 'lax',
            path: '/',
        });
        
        res.status(200).json({message: "Logowanie udane", email});
    } catch (error){
        res.status(400).json({error: error.message});
    }
}
 
const registerUser = async (req, res) => {
    const {email, password, sex, activity, height, weight, goal, age} = req.body;
    try {
        const user = await User.register(email, password, sex, activity, height, weight, goal, age);
        const token = createToken(user._id);
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: 'lax',
            path: '/',
        });
        res.status(200).json({ message: "Rejestracja udana", email});
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
        return res.status(200).json({ 
            isAuthenticated: true, 
            userId: user._id 
        });
    } catch (error) {
        console.error('Błąd weryfikacji tokenu:', error);
        res.status(401).json({ message: "Sesja wygasła lub nieprawidłowy token" });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Wylogowano pomyślnie" });
    } catch (error) {
        console.error('Błąd podczas wylogowywania:', error);
        res.status(500).json({ error: "Wystąpił błąd podczas wylogowywania" });
    }
};

const getUserEmail = async (req, res) => {
    try {
        const token = req.cookies.token;
        console.log('🔑 Token:', token ? 'Istnieje' : 'Brak tokena');

        if (!token) {
            return res.status(401).json({ message: "Nie zalogowany" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken._id).select('email');
        if (!user) {
            return res.status(404).json({ message: "Użytkownik nie znaleziony" });
        }
        console.log('Zwracanie emaila użytkownika:', user.email);
        res.status(200).json({
            email: user.email
        });
    } catch (error) {
        console.error('Błąd weryfikacji tokenu:', error);
        res.status(401).json({ message: "Sesja wygasła lub nieprawidłowy token" });
    }
};

const getUserData = async (req, res) => {
    try {
        const token = req.cookies.token;
        console.log('🔑 Token:', token ? 'Istnieje' : 'Brak tokena');

        if (!token) {
            return res.status(401).json({ message: "Nie zalogowany" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken._id);
        if (!user) {
            return res.status(404).json({ message: "Użytkownik nie znaleziony" });
        }
        
        console.log('Zwracanie danych użytkownika:', user.email);
        res.status(200).json({
            email: user.email,
            sex: user.sex,
            activity: user.activity,
            height: user.height,
            weight: user.weight,
            goal: user.goal,
            age: user.age,
            additionalData: user.additionalData
        });
    } catch (error) {
        console.error('Błąd weryfikacji tokenu:', error);
        res.status(401).json({ message: "Sesja wygasła lub nieprawidłowy token" });
    }
};

module.exports = { loginUser, registerUser, getUserStatus, getUserEmail, logoutUser, getUserData }

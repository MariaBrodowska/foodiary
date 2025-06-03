const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({error: 'Wymagane uwierzytelnienie'});
        }
        // console.log('Token:', token);
        // console.log('Secret:', process.env.SECRET);
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Żądanie nie jest autoryzowane'});
    }
};

module.exports = requireAuth;
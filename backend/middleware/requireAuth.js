const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({error: 'Wymagane uwierzytelnienie'});
        }
        
        const { _id } = jwt.verify(token, process.env.SECRET);
        
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Żądanie nie jest autoryzowane'});
    }
};

module.exports = requireAuth;
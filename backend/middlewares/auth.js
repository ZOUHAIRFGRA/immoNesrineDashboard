const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secretKey = 'your_secret_key'; // Replace with your actual secret key

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log('No authorization header provided');
        return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.userId);
        if (!user) {
            console.log('User not found');
            return res.sendStatus(401);
        }
        req.user = user; // Attach user object to request for further processing if needed
        console.log('Authentication successful');
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.sendStatus(401);
    }
};

module.exports = authMiddleware;

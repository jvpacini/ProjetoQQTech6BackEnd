const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        console.log('Verifying token:', token); // Log token
        console.log('Using JWT secret:', process.env.JWT_SECRET); // Log JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Token verification failed:', err); // Log error details
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

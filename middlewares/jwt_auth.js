const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {

    //Authenticates the User based on the JWT token provided in the request header
    const authHeader = req.headers.authorization;
    
    if(!authHeader) return res.status(401).json({msg: 'No JWT token provided'});
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Invalid JWT token'});
    }
};
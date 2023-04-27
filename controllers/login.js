const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

module.exports = async (req,res) => {
    const {email, password} = req.body;

    try {
        //Get hash from database
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({status: 404, message: 'User not found.'});
        }

        const isMatch = await bcrypt.compare(password, user.hash)

        if (!isMatch) {
            return res.status(401).json({status: 401, message: 'Incorrect password.'});
        } 

        const {hash, ...userWithoutHash} = user.toObject();
        const {messages, ...userWithoutMessages} = userWithoutHash;
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        return res.status(200).json({
            status: 200,
            user: userWithoutMessages,
            messages: messages.filter(message => message.role !== 'system'),
            token
        })
        
    } catch (err) {
        res.status(500).json({status: 500, message: err.message});
    }
}
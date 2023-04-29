const User = require('../models/User');
const { sendNewEmailVerification } = require('../helpers/emailSender');
const logger = require('../config/logger');
require('dotenv').config();

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) return res.status(410).json({message: 'User deleted.'});

        const {messages, userSafe} = user.split();

        return res.status(200).json({
            user: userSafe,
            messages
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) return res.status(410).json({status: 410, message: 'User deleted.'});

        await user.update(req.body);

        console.log(user.messages)
        
        if(req.body.email && req.body.email !== user.email) {
            sendNewEmailVerification(req.body.email, user);
        }

        res.status(200).json({status: 200, message: 'User updated.'});
    } catch (err) {
        res.status(500).json({status: 500, message: err.message});
    }
}

module.exports = {
    getUser,
    updateUser
}
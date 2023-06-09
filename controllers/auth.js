const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {sendInitialVerification} = require('../helpers/emailSender');
const bcrypt = require('bcrypt');
const logger = require('../config/logger');
require('dotenv').config();

const create_token = (user) => {
    return jwt.sign(
        {id: user._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: '7d'}
    );
}

const login = async (req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) return res.status(400).json({status: 400, message: 'Username or password is incorrect.'});

        if (!user.verified) return res.status(400).json({status: 400, message: 'User not verified.'});

        const isMatch = await bcrypt.compare(password, user.hash);

        if (!isMatch) return res.status(400).json({status: 400, message: 'Username or password is incorrect.'});

        user.last_login_at = new Date();
        await user.save();
        
        const {messages, userSafe} = user.split();

        return res.status(200).json({
            status: 200,
            user: userSafe,
            messages,
            token: create_token(user)
        })
    } catch (err) {
        logger.error(err.message)
        res.status(500).json({status: 500, message: "Server Error (Probably Something on Our End)"});
    }  
}

const register = async (req,res) => {
    const {name, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if (existingUser) return res.status(400).json({status: 400, message: 'User already exists.'});

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const hash = await bcrypt.hash(password, salt);

        if(name == "" || email == "" || password == ""){
            return res.status(400).json({status: 400, message: 'No fields can be empty'})
        }
        const newUser = new User({
            name,
            email,
            hash,
            messages: []
        });

        const user = await newUser.save();
        const {messages, userSafe} = user.split();

        sendInitialVerification(email, user);
        
        return res.status(200).json({
            status: 200,
            user: userSafe,
            messages
        })
    } catch (err) {
        logger.error(err.message)
        res.status(500).json({status: 500, message: "Server Error (Probably Something on Our End)"});
    }
}

const verify = async (req,res) => {
    const token = req.query.token; 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    try {
        if(!decoded.verify) return res.status(401).json({status: 401, message: 'Invalid JWT token'});

        const user = await User.findById(decoded.id);

        if (!user) return res.status(410).json({status: 410, message: 'User deleted.'});

        if(decoded.newEmail) {
            await user.verifyNewEmail();
        } else {
            await user.verify();
        }

        res.redirect('/index.html?verified=true');
    } catch (err) {
        res.status(500).json({status: 500, message: err.message});
    }
}



module.exports = {
    login,
    register, 
    verify
}
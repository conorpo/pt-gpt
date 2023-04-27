const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {sendInitialVerification} = require('../helpers/emailSender');
const bcrypt = require('bcrypt');
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

        if (!user) return res.status(400).json({message: 'Username or password is incorrect.'});

        if (!user.verified) return res.status(400).json({message: 'User not verified.'});

        const isMatch = await bcrypt.compare(password, user.hash);

        if (!isMatch) return res.status(400).json({message: 'Username or password is incorrect.'});

        user.last_login_at = new Date();
        await user.save();
        
        const {messages, userSafe} = user.split();

        return res.status(200).json({
            user: userSafe,
            messages,
            token: create_token(user)
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    }  
}

const register = async (req,res) => {
    const {name, email, password} = req.body;

    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const hash = await bcrypt.hash(password, salt);

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
            user: userSafe,
            messages
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const verify = async (req,res) => {
    const token = req.query.token; 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    try {
        if(!decoded.verify) return res.status(401).json({message: 'Invalid JWT token'});

        const user = await User.findById(decoded.id);

        if (!user) return res.status(410).json({message: 'User deleted.'});

        if(decoded.newEmail) {
            await user.verifyNewEmail();
        } else {
            await user.verify();
        }

        res.redirect('/index.html?verified=true');
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}



module.exports = {
    login,
    register, 
    verify
}
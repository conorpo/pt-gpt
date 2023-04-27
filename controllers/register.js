const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async (req,res) => {
    const {name, email, password} = req.body;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            hash,
            messages: []
        });

        const user = await newUser.save();

        const {hashV, ...userWithoutHash} = user.toObject();
        const {messages, ...userWithoutMessages} = userWithoutHash;

        return res.status(200).json({
            status: 200,
            user: userWithoutMessages,
            messages: messages.filter(message => message.role !== 'system'),
            token: jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        })
    } catch (err) {
        res.status(500).json({status: 500, message: err.message});
    }
};
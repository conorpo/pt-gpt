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

        req.session.user_id = user._id;

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
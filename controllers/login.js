const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async (req,res) => {
    const {email, password} = req.body;

    try {
        //Get hash from database
        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(404).json({message: 'User not found.'});
        }

        const hash = user.hash;
        bcrypt.compare(password, hash, function(err, result) {
            if (err) {
                return res.status(500).json({message: err.message});
            }
            if (result) {
                req.session.user_id = user._id;
                return res.status(200).send("Login successful.")
            }
            return res.status(401).json({message: 'Incorrect password.'});
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}
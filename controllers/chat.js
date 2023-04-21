const UserModel = require('../models/User');
const logger = require('../config/logger');
const openai = require('../config/openai_connection');
require('dotenv').config();


module.exports = async (req, res, next) => {
    try{    
        let messages; 

        if(process.env.NODE_ENV === 'development') {
            messages = require('../config/test_chat');
        }else{
            // Get User from DB  
            const User = await UserModel.findById(req.user.id);

            messages = User.messages;
        }

        
        // Add the message from the user to the messages array
        messages.push({
            role: 'user',
            content: req.body.msg
        });
        
        
        // Request OpenAI to complete the next message
        const completion = await openai.createChatCompletion({
            model: process.env.OPENAI_MODEL,
            messages
        });

        const response = completion.data.choices[0].message;

        messages.push(response);
        logger.info(`Completed Message from ${(process.env.NODE_ENV === 'development') ? "Test User" : User.name}: ${response.content}`);
            
        res.status(200).send(response.content);

        if(process.env.NODE_ENV === 'development') return;
        
        User.updateOne({messages}); 
    } catch (err) {
        logger.error(err.message);

        if(process.env.NODE_ENV === 'development') {
            return res.status(500).json(err.message);
        } else {
            return res.status(500).json({msg: 'Server Error'});
        }
    }
}
const User = require('../models/User');
const logger = require('../config/logger');
const openai = require('../config/openai_connection');
require('dotenv').config();


module.exports = async (req, res, next) => {
    try{    
        const user = await User.findById(req.userId)

        if(!user) {
            return res.status(404).json({msg: 'User not found'});
        }

        const messages = [{role: 'system', content: process.env.SYSTEM_MESSAGE}].concat(user.messages);

        const new_messages = [{
            role: 'user',
            content: req.body.msg,
            createdAt: new Date()
        }];

        // Request OpenAI to complete the next message
        const completion = await openai.createChatCompletion({
            model: process.env.OPENAI_MODEL,
            messages: messages.concat(new_messages).map(message => ({content: message.content, role: message.role})),
            max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS),
        });

        
        const response = completion.data.choices[0].message;
        response.createdAt = new Date();
        new_messages.push(response);

        logger.info(`Completed Message from ${user.name}: ${response.content}`);
        
        await User.findByIdAndUpdate(req.userId,
            {$push: {messages: {$each: new_messages}}} 
        );

        res.status(200).json({
            text: response.content,
            createdAt: response.createdAt,
        });    
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: err.message});
    }
}
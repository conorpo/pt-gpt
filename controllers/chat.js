const User = require('../models/User');
const logger = require('../config/logger');
const openai = require('../config/openai_connection');
require('dotenv').config();


module.exports = async (req, res, next) => {
    try{    
        const user = await User.findById(req.session.user_id)

        if(!user) {
            return res.status(404).json({msg: 'User not found'});
        }

        const messages = [{role: 'system', content: process.env.SYSTEM_MESSAGE}].concat(user.messages);

        const new_messages = [{
            role: 'user',
            content: req.body.msg
        }];

        console.log(messages.concat(new_messages));
        
        // Request OpenAI to complete the next message
        const completion = await openai.createChatCompletion({
            model: process.env.OPENAI_MODEL,
            messages: messages.concat(new_messages)
        });

        const response = completion.data.choices[0].message;
        console.log(response)
        new_messages.push(response);
        
        logger.info(`Completed Message from ${user.name}: ${response.content}`);
        
        
        await User.findByIdAndUpdate(req.session.user_id,
            {$push: {messages: {$each: new_messages}}} 
        );

        res.status(200).send(response.content);    
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}
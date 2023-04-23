const User = require('../models/User');


module.exports = async (req,res) => {
    
    updatedData = req.body;
    const id = req.session.user_id;
    console.log(req.session);
    
    try {
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        
        // Update the user with new data
        user.name = updatedData.name || user.name;
        user.pronouns = updatedData.pronouns || user.pronouns;
        user.email = updatedData.email || user.email;
        user.age = updatedData.age || user.age;
        user.height = updatedData.height || user.height;
        user.weight = updatedData.weight || user.weight;
        user.goals = updatedData.goals || user.goals;
        user.metric = updatedData.metric || user.metric;
        user.sports = updatedData.sports || user.sports;
        user.personality = updatedData.personality || user.personality;
        
        // Save the updated user to the database
        await user.save();

        const updated = (user.messages.length > 1) ? '(updated)' : '';

        // Append new System Message
        const new_message = {
            role: 'system',
            content: `Assigned User Info (updated):\n\nName: ${user.name}\nPronouns: ${user.pronouns}\nHeight: ${user.height + (user.metric ? ' cm' : ' in')}\nWeight: ${user.weight + (user.metric ? ' kg' : ' lbs')}\nSports: ${user.sports}\nGoals (written by User): ${user.goals}\n\nYour User has chosen the following personality for you: ${user.personality}\nTry to embody the personality that your user has chosen, speak mostly objectively and always answer as best you can, but feel free to add some of the personality to the conversation, and embellish some sentences to make them more interesting. Feel free to use the User's name, pronouns, or any other info in responses. Please stay in character, talk like your character and don't say you are an AI.`
        }

        await User.findByIdAndUpdate(id,
            {$push: {messages: new_message}}
        );

        res.status(200).send('User info updated');
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: {type: String, unique: true, required: true},
    next_email: String,
    verified: {type: Boolean, default: false},
    hash: {type: String, required: true},    
    pronouns: String,

    age: Number,
    height: Number,
    weight: Number,
    metric: {type: Boolean, default: false},
    
    sports: String,
    goals: String,
    
    personality: {type: String, enum:['Mickey Mouse', 'Robin Hood', 'Zorro', 'Sherlock', 'Dracula', 'Hercules', 'Tarzan', 'Thor', 'Popeye', 'Cthulhu', 'AI'], default: 'AI'},
    
    messages: Object,
    
    created_at: {type: Date, default: Date.now},
    updated_at: Date,
    last_login_at: Date,
    last_message_at: Date,
});

UserSchema.methods.split = function() {
    return {
        messages: this.messages.filter(message => message.role !== 'system'),
        userSafe: {
            name: this.name,
            email: this.email,
            pronouns: this.pronouns,
            
            age: this.age,
            height: this.height,
            weight: this.weight,
            metric: this.metric,

            goals: this.goals,
            sports: this.sports,

            personality: this.personality,
        }
    }
}

UserSchema.methods.verify = function() {
    this.verified = true;
    this.save();
}

UserSchema.methods.verifyNewEmail = function(){
    this.email = this.next_email;
    this.next_email = null;
    this.save();
}

UserSchema.methods.update = function(updatedData) {
    this.name = updatedData.name || this.name;
    this.next_email = updatedData.email || this.email;
    this.pronouns = updatedData.pronouns || this.pronouns;
    
    this.age = updatedData.age || this.age;
    this.height = updatedData.height || this.height;
    this.weight = updatedData.weight || this.weight;
    this.metric = updatedData.metric;

    this.sports = updatedData.sports || this.sports;
    this.goals = updatedData.goals || this.goals;

    this.personality = updatedData.personality || this.personality;

    
    const updated = (this.updated_at != null) ? ' (updated)' : '';
    this.messages.push({
        role: 'system',
        content: `Assigned User Info${updated}:\n\nName: ${this.name}\nPronouns: ${this.pronouns}\nHeight: ${this.height + (this.metric ? ' cm' : ' in')}\nWeight: ${this.weight + (this.metric ? ' kg' : ' lbs')}\nSports: ${this.sports}\nGoals (written by User): ${this.goals}\n\nYour User has chosen the following personality for you: ${this.personality}\nTry to embody the personality that your user has chosen, speak mostly objectively and always answer as best you can, but feel free to add some of the personality to the conversation, and embellish some sentences to make them more interesting. Feel free to use the User's name, pronouns, or any other info in responses. Please stay in character, talk like your character and don't say you are an AI.`
    });

    this.updated_at = Date.now();
    this.save();
}


const User = mongoose.model('User', UserSchema);

module.exports = User;
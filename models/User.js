const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: {type: String, unique: true, required: true},
    hash: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    pronouns: String,
    age: Number,
    height: Number,
    weight: Number,
    sports: String,
    goals: String,
    messages: Object,
    metric: {type: Boolean, default: false},
    personality: {type: String, enum:['Mickey Mouse', 'Robin Hood', 'Zorro', 'Sherlock', 'Dracula', 'Hercules', 'Tarzan', 'Thor', 'Popeye', 'Cthulhu', 'AI'], default: 'AI'}

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
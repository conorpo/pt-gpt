const config = require('../config/config');
const { v4: messageIdGenerator } = require('uuid');

export function convertMessage(message, user) {
    return {
        _id: messageIdGenerator(),
        text: message.content,
        createdAt: message.createdAt,
        user: {
            _id: message.role,
            name: (message.role == 'user') ? user.name : user.personality,
            avatar: `${config.URI}/imgs/personalities/${this.personality}.png`
        }
    };
}
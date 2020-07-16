require('dotenv').config();
const { Message } = require('discord.js');
const { UserService } = require('../services/userService.js');
const { User } = require('../models');

const svc = new UserService(User);

/**
 *
 * @param {Message} message
 * @param {*} args
 */
const run = async (message, args) => {
    try {
        await svc.updateByDiscordId(message.author.id, {
            bio: args,
        });
        message.author.send('**Success!** 💬 Your new bio: '  + args);
        
    } catch (error) {
        message.author.send(error.message);
    }
};

module.exports = {
    run,
    name: 'bio',
    description: 'Tell us something about yourself.',
};

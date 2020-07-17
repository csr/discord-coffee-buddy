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
            linkedin: args,
        });
        message.author.send('**Success!** 💼 Your new LinkedIn profile link is ' + '\*\*' + args + '\*\*');
    } catch (error) {
        message.author.send(error.message);
    }
};

module.exports = {
    run,
    name: 'linkedin',
    description: 'Set your linkedin profile URL',
};

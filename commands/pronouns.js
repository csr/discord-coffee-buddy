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
            pronouns: args,
        });
        message.author.send('**Success!** 💖 I\'ve set your pronouns to ' + args);
    } catch (error) {
        message.author.send(error.message);
    }
};

module.exports = {
    run,
    name: 'pronouns',
    description: 'Set your pronouns :)',
};

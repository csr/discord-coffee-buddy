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
            github: args,
        });
        message.author.send('**Success!** 🐙 Your new GitHub profile link is ' + '\*\*' + args + '\*\*');
    } catch (error) {
        message.author.send(error.message);
    }
};

module.exports = {
    run,
    name: 'github',
    description: 'Set your github profile URL',
};

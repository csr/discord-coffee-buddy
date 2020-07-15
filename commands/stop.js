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
        await svc.updateByDiscordId(message.author.id, { enrolled: false });
        message.author.send(
            'Aww, it is sad to see you go. Hope we will meet again 😃'
        );
    } catch (e) {
        message.author.send(e.message);
    }
};

module.exports = {
    run,
    name: 'stop',
    description: 'We will stop your pairing sessions',
};

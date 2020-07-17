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
    const prefix = process.env.PREFIX || '!';
    try {
        await svc.updateByDiscordId(message.author.id, { enrolled: false });
        message.author.send(
            `**Pairings stopped!** It is sad to see you go, but you can **${prefix + 'start'}** again anytime 👋`
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

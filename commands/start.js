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
        await svc.createUser({
            discordId: message.author.id,
            username: message.author.username,
        });
        message.author.send(
            'Yay! It is happy to see you. You are now enrolled 😃'
        );
    } catch (e) {
        message.author.send(e.message);
    }
};

module.exports = {
    run,
    name: 'start',
    description: 'Enroll yourself into the pairing session',
};

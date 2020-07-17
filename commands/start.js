require('dotenv').config();
const { Message } = require('discord.js');
const { UserService } = require('../services/userService.js');
const { User } = require('../models');
const displayHelp = require('./help');

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
            'Yay, I\'ll pair you with someone new every week! I hope you\'ll make new lifelong friends ✨ In the meantime, you can build your profile.'
        );
        displayHelp.run(message, args);
    } catch (e) {
        message.author.send(e.message);
    }
};

module.exports = {
    run,
    name: 'start',
    description: 'Enroll yourself into the pairing session',
};

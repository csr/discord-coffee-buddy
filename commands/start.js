

require('dotenv').config();
const { Message } = require('discord.js');
const { userService } = require('./services/userService.js');
const { User } = require('../models');

const svc = new UserService(User);


/**
 * 
 * @param {Message} message 
 * @param {*} args
 */
const run = (message, args) => {
    svc.create({
        discordId: message.author.id,
    });
message.author.send('Yay! It is happy to see you. You are now enrolled 😃');
}

module.exports = {
    run,
    name: 'start',
    description: 'Enroll yourself into the pairing session'
};

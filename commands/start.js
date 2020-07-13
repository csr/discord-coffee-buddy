require('dotenv').config();
const { Message } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {*} args
 */
const run = (message, args) => {
    message.author.send('Yay! It is happy to see you. You are now enrolled 😃');
}

module.exports = {
    run,
    name: 'start',
    description: 'Enroll yourself into the pairing session'
};

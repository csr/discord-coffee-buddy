require('dotenv').config();
const { Message } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {*} args
 */
const run = (message, args) => {
    message.author.send('Yay! We have set your pronouns to ' + args);
}

module.exports = {
    run,
    name: 'pronouns',
    description: 'Set your pronouns :)'
};

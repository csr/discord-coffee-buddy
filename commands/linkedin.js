require('dotenv').config();
const { Message } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {*} args
 */
const run = (message, args) => {
    message.author.send('Yay! We have set your linkedin profile to ' + args);
}

module.exports = {
    run,
    name: 'linkedin',
    description: 'Set your linkedin profile URL'
};

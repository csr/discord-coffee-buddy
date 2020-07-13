require('dotenv').config();
const { Message } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {*} args
 */
const run = (message, args) => {
    message.author.send('Yay! We have set your github profile to ' + args);
}

module.exports = {
    run,
    name: 'github',
    description: 'Set your github profile URL'
};

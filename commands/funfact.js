require('dotenv').config();
const { Message } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {*} args
 */
const run = (message, args) => {
    message.author.send('Yay! We have set your funfact as ' + args);
}

module.exports = {
    run,
    name: 'funfact',
    description: 'Say us our funfact.'
};

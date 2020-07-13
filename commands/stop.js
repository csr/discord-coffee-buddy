require('dotenv').config();
const { Message } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {*} args
 */
const run = (message, args) => {
    message.author.send('Aww, it is sad to see you go. Hope we will meet again 😃');
}

module.exports = {
    run,
    name: 'stop',
    description: 'We will stop your pairing sessions'
};

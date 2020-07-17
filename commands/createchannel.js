require('dotenv').config();
const { Message } = require('discord.js');
const createChannel = require('../helpers/create-channel');

/**
 * 
 * @param {Message} message 
 * @param {*} args
 */
const run = (message, args) => {
    const userID1 = '484739100604235786';
    const userID2 = '229858084493721600';

    return createChannel(message.client, userID1, userID2);
}

module.exports = {
    run,
    name: 'createchannel',
    description: 'This will create a channel (not for external).'
};

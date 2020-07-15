require('dotenv').config();
const { Client, Guild } = require('discord.js');
const createChannel = require('./../create-channel');

const getRandomUsers = () => {
    // Call the db, get list of users, create random pairs
    // And return it as an object / array

    // Something like this;
    return [
        ['638473299072122900', '229858084493721600'],
        ['484101310870847518', '484739100604235786']
    ];
}

/**
 * 
 * @param {Client} client 
 */
const runScheduler = async (client) => {
    console.log('Running the scheduler. Time to match people up. Yuhu!');

    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const users = getRandomUsers();

    for (const pair of users) {
        createChannel(client, pair[0], pair[1])
    }
}

module.exports = runScheduler;

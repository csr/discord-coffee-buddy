require('dotenv').config();
const { Client } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {string} userOne
 * @param {string} userTwo
 */
const createChannel = async (client, userOne, userTwo) => {
    const parentName = 'Coffee Buddy';
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const parent = guild.channels.cache.find(c => c.name == parentName && c.type == 'category');
    const channelPermission = { 'VIEW_CHANNEL': false };
    const channelOptions = {
        parent,
        reason: 'Coffee buddies!',
        permissionOverwrites: [
            {
                id: userOne,
                allow: ['VIEW_CHANNEL'],
            },
            {
                id: userTwo,
                allow: ['VIEW_CHANNEL'],
            }
        ]
    };

    if (!parent) {
        return console.log('No category found to create channels on');
    }

    const userOneObj = await client.users.fetch(userOne);
    const userTwoObj = await client.users.fetch(userTwo);

    const textChannel = await guild.channels.create(`${userOneObj.username}-${userTwoObj.username}`, {
        ...channelOptions,
        type: 'text'
    });
    const voiceChannel = await guild.channels.create(`${userOneObj.username}-${userTwoObj.username}`, { 
        ...channelOptions,
        type: 'voice'
    });

    textChannel.updateOverwrite(textChannel.guild.roles.everyone, channelPermission);
    voiceChannel.updateOverwrite(textChannel.guild.roles.everyone, channelPermission);
    textChannel.send(`Hello, welcome ${userOneObj} and ${userTwoObj}! ✨`);
}

module.exports = createChannel;

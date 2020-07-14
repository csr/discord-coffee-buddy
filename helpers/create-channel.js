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
    const permissionOverwrites = [
        {
            id: userOne,
            allow: ['VIEW_CHANNEL'],        
        },
        {
            id: userTwo,
            allow: ['VIEW_CHANNEL'],        
        }
    ];

    if (!parent) {
        return console.log('No category found to create channels on');
    }

    const textChannel = await guild.channels.create('coffee-buddy-meet', { 
        parent,
        type: 'text',
        permissionOverwrites,
        reason: 'Coffee buddies!'
    });
    textChannel.updateOverwrite(textChannel.guild.roles.everyone, {
        'VIEW_CHANNEL': false
    });

    const userOneName = await client.users.fetch(userOne);
    const userTwoName = await client.users.fetch(userTwo);
    textChannel.send(`Hello, welcome @${userOneName} and @${userTwoName}! ✨`);

    const voiceChannel = await guild.channels.create('coffee-buddy-meet', { 
        parent,
        type: 'voice',
        permissionOverwrites,
        reason: 'Coffee buddies!'
    });
    voiceChannel.updateOverwrite(textChannel.guild.roles.everyone, {
        'VIEW_CHANNEL': false
    });
}

module.exports = createChannel;

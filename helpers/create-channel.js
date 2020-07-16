require('dotenv').config();
const { Client } = require('discord.js');
const { UserService } = require('../services/userService.js');
const { User } = require('../models');

const svc = new UserService(User);
const getUserProfileEmbed = require('../helpers/profile-embed');


/**
 * 
 * @param {Client} client 
 * @param {string} userOne
 * @param {string} userTwo
 */
const createChannel = async (client, userOne, userTwo) => {
    const parentName = 'Coffee Buddy';
    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    let parent = guild.channels.cache.find(c => c.name == parentName && c.type == 'category');
    if (!parent) {
        parent = await guild.channels.create(parentName, { type: 'category' });
    }

    const userOneObj = await client.users.fetch(userOne);
    const userTwoObj = await client.users.fetch(userTwo);

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

    const textChannel = await guild.channels.create(`${userOneObj.username}-${userTwoObj.username}`, {
        ...channelOptions,
        type: 'text'
    });
    const voiceChannel = await guild.channels.create(`${userOneObj.username}-${userTwoObj.username}`, { 
        ...channelOptions,
        type: 'voice'
    });

    const channelPermission = { 'VIEW_CHANNEL': false };
    textChannel.updateOverwrite(guild.roles.everyone, channelPermission);
    voiceChannel.updateOverwrite(guild.roles.everyone, channelPermission);

    textChannel.send(`Hello, welcome ${userOneObj} and ${userTwoObj}! ✨ Why don't you two pick a time to meet digitally for a casual 1-on-1?`);

    const userOneDB = await svc.getUser(userOneObj.id);
    const userTwoDB = await svc.getUser(userTwoObj.id);

    const embedOne = getUserProfileEmbed(userOneObj, userOneDB);
    const embedTwo = getUserProfileEmbed(userTwoObj, userTwoDB);

    textChannel.send(embedOne);
    textChannel.send(embedTwo);
}

module.exports = createChannel;

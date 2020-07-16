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

    textChannel.send(`Hello, welcome ${userOneObj} and ${userTwoObj}! 👋`);
    textChannel.send(`You've been paired together to schedule an informal chat to get to know each other. Pick a time to meet digitally for a casual 1-on-1 this week! ✨`);
    textChannel.send('Here\'s some **suggested questions** you can ask in the call to get started:')
    
    const suggestedQuestions = [
        "Are there any projects you’d really like to work on if you were given the opportunity?",
        "What do you want to be doing in 5 years? 10 years? 3 years?",
        "Who do you really admire? Why?",
        "What are your super powers? What powers would you like to develop?",
        "How did you get started coding?",
        "What's a project you worked on recently that you're proud of? Why?",
        "What skills would you like to develop right now?",
        "What do you like to do in your free time? What are your hobbies?",
        "What drives you? What motivates you to do your best each day?",
        "When you get stuck on something, what is your process for getting unstuck?"
    ]

    var chosenQuestions = []

    for (var i = 0; i < 3; i++) {
        const index = Math.floor(Math.random()*suggestedQuestions.length);
        const question = suggestedQuestions[index];

        // Delete to avoid repeated questions
        suggestedQuestions.splice(index, 1);

        chosenQuestions.push('- ' + question);
    }

    textChannel.send(chosenQuestions.join('\n'));

    const userOneDB = await svc.getUser(userOneObj.id);
    const userTwoDB = await svc.getUser(userTwoObj.id);

    const embedOne = getUserProfileEmbed(userOneObj, userOneDB);
    const embedTwo = getUserProfileEmbed(userTwoObj, userTwoDB);

    textChannel.send(embedOne);
    textChannel.send(embedTwo);
}

module.exports = createChannel;

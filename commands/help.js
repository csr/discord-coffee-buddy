require('dotenv').config();
const { Message, MessageEmbed } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {*} args
 */
const run = (message, args) => {
    const prefix = process.env.PREFIX || '!';
    const embed = new MessageEmbed()
        .setTitle('Commands')
        .setDescription('Tell me more about yourself and I\'ll share your profile with future buddies.')
        .addFields(
            { value: prefix + 'start', name: '✨ Start pairings', inline: true },
            { value: prefix + 'stop', name: '🛑 Stop pairings', inline: true },
        )
        .addFields(
            { value: prefix + 'linkedin <url>', name: '💼 Share your LinkedIn', inline: true },
            { value: prefix + 'bio <about me>', name: '💬 Share bio', inline: true },
        )
        .addFields(
            { value: prefix + 'pronouns <pronouns>', name: '💖 Set your pronouns', inline: true },
            { value: prefix + 'github <url>', name: '💻 Share your GitHub', inline: true },
        )
        .addFields(
            { value: prefix + 'profile', name: '👤 View your profile', inline: true },
        );

    return message.author.send(embed);
};

module.exports = {
    run,
    name: 'help',
    description: 'Displays list of commands'
};

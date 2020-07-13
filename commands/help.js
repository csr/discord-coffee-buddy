require('dotenv').config();
const { Message, MessageEmbed } = require('discord.js');

/**
 * 
 * @param {Message} message 
 */
const run = (message) => {
    const prefix = process.env.PREFIX;
    const embed = new MessageEmbed({
        setTitle: 'Coffee Buddy Commands!',
        setDescription: 'Here is the list of commands available for you to interact with this bot',
        fields: [
            {
                name: '✨ Start the pairing session',
                value: prefix + 'start',
                inline: true
            },
            {
                name: '🛑 Stop the pairing session',
                value: prefix + 'stop',
                inline: true
            },
            {
                name: '💖 Set your pronouns',
                value: prefix + 'pronouns <pronun>',
                inline: true
            },
            {
                name: '💻 Share your GitHub profile',
                value: prefix + 'github <url>',
                inline: true
            },
            {
                name: '💼 Share your LinkedIn profile',
                value: prefix + 'linkedin <url>',
                inline: true
            },
            {
                name: '🐙 Share a fun fact about yourself',
                value: prefix + 'funfact <your fun fact>',
                inline: true
            }
        ]
    });

    return message.author.send(embed);
};

module.exports = {
    run,
    command: 'help',
    description: 'Displays list of commands'
};

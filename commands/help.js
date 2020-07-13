require('dotenv').config();
const { Message, MessageEmbed } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {*} args
 */
const run = (message, args) => {
    const prefix = process.env.PREFIX;
    const embed = new MessageEmbed({
        setTitle: 'Coffee Buddy Commands!',
        setDescription: 'Here is the list of commands available for you to interact with this bot',
        fields: [
            {
                value: '✨ Start the pairing session',
                name: prefix + 'start',
                inline: true
            },
            {
                value: '🛑 Stop the pairing session',
                name: prefix + 'stop',
                inline: true
            },
            {
                value: '💖 Set your pronouns',
                name: prefix + 'pronouns <pronun>',
                inline: true
            },
            {
                value: '💻 Share your GitHub profile',
                name: prefix + 'github <url>',
                inline: true
            },
            {
                value: '💼 Share your LinkedIn profile',
                name: prefix + 'linkedin <url>',
                inline: true
            },
            {
                value: '🐙 Share a fun fact about yourself',
                name: prefix + 'funfact <your fun fact>',
                inline: true
            }
        ]
    });

    return message.author.send(embed);
};

module.exports = {
    run,
    name: 'help',
    description: 'Displays list of commands'
};

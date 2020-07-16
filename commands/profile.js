const { Message, MessageEmbed } = require('discord.js');
const { UserService } = require('../services/userService.js');
const { User } = require('../models');

const svc = new UserService(User);

const buildProfileEmbed = (user) => {
    return new MessageEmbed({
        setTitle: 'Profile',
        setDescription: 'Here is your profile',
        fields: [
            {
                name: 'Username ✨',
                value: user.username,
                inline: true,
            },
            {
                name: 'Github 💻',
                value: user.github || 'No github set',
                inline: true,
            },
            {
                name: 'Pronouns 💖',
                value: user.pronouns || 'No pronouns set',
                inline: true,
            },
            {
                name: 'LinkedIn 💼',
                value: user.linkedin || 'No linkedin set',
                inline: true,
            },
            {
                name: '🐙 Funfact about you',
                value: user.funfact || 'No funfact set',
                inline: true,
            },
        ],
    });
};

/**
 *
 * @param {Message} message
 * @param {*} args
 */

const run = async (message, args) => {
    try {
        await svc.assertUserIsRegistered(message.author.id);
        const user = await svc.findOne({
            discordId: message.author.id,
        });
        const embed = buildProfileEmbed(user);
        message.author.send(embed);
    } catch (error) {
        message.author.send(error.message);
    }
};

module.exports = {
    run,
    name: 'profile',
    description: 'View your profile.',
};

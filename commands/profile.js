const { Message, MessageEmbed } = require('discord.js');
const { UserService } = require('../services/userService.js');
const { User } = require('../models');

const getUserProfileEmbed = require('../helpers/profile-embed');
const svc = new UserService(User);

/**
 *
 * @param {Message} message
 * @param {*} args
 */

const run = async (message, args) => {
    try {
        await svc.assertUserIsRegistered(message.author.id);
        const userDB = await svc.findOne({
            discordId: message.author.id,
        });
        const userDiscord = await message.client.users.fetch(userDB.discordId);
        const embed = getUserProfileEmbed(userDiscord, userDB);
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

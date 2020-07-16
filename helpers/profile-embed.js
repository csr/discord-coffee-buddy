const { MessageEmbed } = require('discord.js');

const getUserProfileEmbed = (userDiscordObj, userDBObj) => {
    return new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${userDiscordObj.username}'s Profile`)
        .setThumbnail(userDiscordObj.avatarURL())
        .addFields(
            { name: '💖 Pronouns', value: userDBObj.pronouns || '*Not set*' },
            { name: '💻 GitHub', value: userDBObj.github || '*Not set*' },
            { name: '💼 LinkedIn', value: userDBObj.linkedin || '*Not set*' },
            { name: '🐙 Fun fact', value: userDBObj.bio || '*Not set*' },
        );
}

module.exports = getUserProfileEmbed;
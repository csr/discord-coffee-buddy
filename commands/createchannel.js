require('dotenv').config();
const { Message } = require('discord.js');
const Discord = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {*} args
 */
  
const run = (message, args) => {
    let categoryName = 'Coffee Buddy';
    let guild = message.client.guilds.cache.get(process.env.GUILD_ID);
    let category = guild.channels.cache.find(c => c.name == categoryName && c.type == 'category');
    if (category) {
        guild.channels.create('coffee-buddy-meet', { type: 'text', parent: category, reason: 'New channel added for fun!' });
    } else {
        console.log('No category found to add channel to!')
        // guild.channels.create(categoryName, { type: 'category', reason: 'New channel added for fun!' });
    }    
}

module.exports = {
    run,
    name: 'createchannel',
    description: 'This will create a channel (not for external).'
};

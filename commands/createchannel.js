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
    let userID1 = '638473299072122900'
    let userID2 = '732503637296939058'
    let permissionOverwrites = [
        {
            id: userID1,
            allow: ['VIEW_CHANNEL'],        
        },
        {
            id: userID2,
            allow: ['VIEW_CHANNEL'],        
        }
    ];
    
    if (category) {
        guild.channels.create('coffee-buddy-meet', 
        { 
            type: 'text',
            parent: category,
            permissionOverwrites: permissionOverwrites,
            reason: 'Coffee buddies!' 
        }).then(channel => {
            // Disallow Everyone to see, join, invite, or speak
            channel.updateOverwrite(channel.guild.roles.everyone, {
                'VIEW_CHANNEL': false
            });
        })

        guild.channels.create('coffee-buddy-meet', 
        { 
            type: 'voice',
            parent: category,
            permissionOverwrites: permissionOverwrites,
            reason: 'Coffee buddies!' 
        }).then(channel => {
            // Disallow Everyone to see, join, invite, or speak
            channel.updateOverwrite(channel.guild.roles.everyone, {
                'VIEW_CHANNEL': false
            });
        })
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

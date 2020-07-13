require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

// Use exclamation mark as the default prefix
const prefix = process.env.PREFIX || '!';
const client = new Discord.Client();

client.on('message', message => {
    // Ignore messages that aren't for this bot to bother
    if (!message.content.startsWith(prefix)) return;
    // Ignore other bot messages
    if (message.author.bot) return;
    // Ignore messages in public places (for now)
    if (message.channel.type !== 'dm') return;

    // Remove irc username suffix
    const messageContent = message.content.replace(/<.*> /, '');
    let args = messageContent
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();
    args = args.join(' ');

    let commandRegistry = [];
    const commandsFile = fs.readdirSync(path.join(__dirname, '/commands/'));
    for (file of commandsFile) {
        const handler = require(path.join(__dirname, '/commands/', file));
        commandRegistry.push({ ...handler });
    }

    // TODO: Prevent program from crashing if user enters unknown command
    const handleCommand = commandRegistry.find(element => element.name === command);
    handleCommand.run(message, args); // Run the command's run function
});

client.once('ready', () =>  console.log('The bot is now ready!'));
client.login(process.env.BOT_TOKEN);

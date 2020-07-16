require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

// Use exclamation mark as the default prefix
const prefix = process.env.PREFIX || '!';
const client = new Discord.Client();

const buildCommandRegistry = () => {
    const commandRegistry = {};
    const commandsFile = fs.readdirSync(path.join(__dirname, '/commands/'));
    for (file of commandsFile) {
        const handler = require(path.join(__dirname, '/commands/', file));
        commandRegistry[handler.name] = { ...handler };
    }
    return commandRegistry;
};

const isInvalidMessage = (message) => {
    // Ignore messages in public places (for now) 'dm
    // Ignore other bot messages - message.author.bot
    // Ignore messages that aren't for this bot to bother
    return (
        !message.content.startsWith(prefix) ||
        message.author.bot ||
        message.channel.type !== 'dm'
    );
};

const unknownCommandHandler = {
    run: (message, args) => {
        message.author.send(
            "I didn't understand that command. Here are the supported commands."
        );
        commandRegistry['help'].run(message, args);
    },
};

const commandRegistry = buildCommandRegistry();

client.on('message', (message) => {
    if (isInvalidMessage(message)) return;

    // Remove irc username suffix
    const messageContent = message.content.replace(/<.*> /, '');
    let args = messageContent.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    args = args.join(' ');

    handler = commandRegistry[command];
    if (!handler) {
        unknownCommandHandler.run(message, args);
        return;
    }
    handler.run(message, args); // Run the command's run function
});

client.once('ready', () => console.log('The bot is now ready!'));
client.login(process.env.BOT_TOKEN);

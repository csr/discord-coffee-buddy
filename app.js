require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const Discord = require('discord.js');
const scheduler = require('./helpers/scheduler');

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
    // Ignore messages that aren't for this bot to bother
    // Ignore other bot messages - message.author.bot
    // Ignore messages that aren't a DM
    return (
        message.author.bot ||
        message.channel.type !== 'dm'
    );
};

const commandRegistry = buildCommandRegistry();

const unknownCommandHandler = {
    run: (message, args) => {
        // Send welcome if it's the first time user messages bot
        message.channel.messages.fetch().then(messages => {
            const botMessages = messages.filter(msg => msg.author.bot);
            if (botMessages.size === 0) {
                message.author.send(`👋😃 Hello! \n\nI'm here to help you get to know new Fellows from other Pods. If you decide to participate, I'll pair you with a new person every week for a short, informal, and fun 1-on-1. It's a great way to get to know more people when working remotely! 🙌\n\nAll you have to do is reply here with **${prefix + 'start'}**. You'll be to able to **${prefix + 'stop'}** anytime.`);
            } else {
                message.author.send(
                    `Oh shoot. I couldn't understand that. Here are the commands I respond to. Make sure you prefix them with **${prefix}**.`
                );
                commandRegistry['help'].run(message, args);
            }
            }).catch(err => {
                console.log(err);
        });
    },
};


client.once('ready', () =>  {
    console.log('The bot is now ready!');

    // Runs this function every minute (for testing purposes)
    // cron.schedule('1 * * * * *', () => {
        // scheduler(client);
    // });
});

client.on('message', (message) => {
    // Handle public mentions
    if (message.channel.type !== 'dm' && message.mentions.members.has(client.user.id)) {
        message.channel.send('**Coffee Buddy** ☕️ is a bot that pairs you with a new Fellow every week so you can make new lifelong friends while working remotely. Send me a private message to get started! ✨');
        return;
    }

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

client.login(process.env.BOT_TOKEN);

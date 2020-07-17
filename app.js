require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const scheduler = require('./helpers/scheduler');
const { Client, Message } = require('discord.js');

// Use exclamation mark as the default prefix
const prefix = process.env.PREFIX || '!';
const client = new Client();

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
        !message.content.startsWith(prefix) ||
        message.author.bot
    );
};

const unknownCommandHandler = {
    run: (message, args) => {
        message.author.send(
            'Oh shoot. Couldn\'t understand that. Here are the commands that I obey, my lord.'
        );
        commandRegistry['help'].run(message, args);
    },
};

/**
 * 
 * @param {Message} message 
 */
const isNewUser = async (message) => {
    const dmMessages = await message.channel.messages.fetch();
    const botMessages = dmMessages.filter(msg => msg.author.bot);

    if (botMessages) {
        return false;
    }

    await message.author.send('👋😃 Hello! I\'m here to help you get to know new Fellows from other Pods.')
    await message.author.send('If you decide to participate, I\'ll pair you with a new person every week for a short, informal, and fun 1-on-1. It\'s a great way to get to know more people when working remotely!');
    await message.author.send(`🙌 To enroll yourself into this, enter **${prefix}start**. You can also see other available commands by entering **${prefix}help**`);

    return true;
}

const commandRegistry = buildCommandRegistry();

client.once('ready', () =>  {
    console.log('The bot is now ready!');

    // Runs this function once every monday.
    // cron.schedule('* * * * * 1', () => {
    //     scheduler(client);
    // });
});

client.on('message', async (message) => {
    // Handle public mentions
    if (message.channel.type !== 'dm' && message.mentions.members.has(client.user.id)) {
        message.channel.send('**Coffee Buddy** ☕️ is a bot that pairs you with a new Fellow every week so you can make new lifelong friends while working remotely. Send me a private message to get started! ✨');
        return;
    }

    if (message.channel.type !== 'dm') return;

    if (await isNewUser(message)) return;
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

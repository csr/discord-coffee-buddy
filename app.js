require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

// Use exclamation mark as the default prefix
const prefix = process.env.PREFIX || '!';

client.on('message', message => {
    // Ignore other bot messages
    if (message.author.bot) return;

    // Ignore messages in public places (for now)
    if (message.channel.type !== 'dm') return;

    let args = messageContent
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();
    args = args.join(' ');

    // Send welcome if it's the first time user messages bot
    message.channel.messages.fetch().then(messages => {
        const botMessages = messages.filter(msg => msg.author.bot);
        if (botMessages.size === 0) {
            return message.author.send(`👋😃 Hello! \n\nI'm here to help you get to know new Fellows from other Pods. If you decide to participate, I'll pair you with a new person every week for a short, informal, and fun 1-on-1. It's a great way to get to know more people when working remotely! 🙌\n\nAll you have to do is reply here with \`start\`. You'll be to able \`stop\` anytime.`);
        }
    }).catch(err => {
        console.log(err);
    });
});

client.once('ready', () =>  console.log('The bot is now ready!'));
client.login(process.env.BOT_TOKEN);

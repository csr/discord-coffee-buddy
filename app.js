require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready');
});

client.login(process.env.BOT_TOKEN);

// Use exclamation mark as the default prefix
const prefix = process.env.PREFIX || '!';

const help = '**Bot commands**\n✨ Start pairings with `!start`\n🛑 Stop pairings with `!stop`\n💖 Set your pronouns with `!pronouns PRONOUNS`\n💻 Share your GitHub profile with `!github GITHUB_URL`\n💼 Share your LinkedIn profile with `!linkedin LINKEDIN_URL`\n🐙 Share a fun fact about yourself with `!funfact FUN_FACT`\n❔ Show this menu with `!help`';

client.on('message', message => {
    // Ignore other bot messages
    if (message.author.bot) return;

    // Remove irc username suffix
    const messageContent = message.content.replace(/<.*> /, '');

    // Ignore messages in public places (for now)
    if (message.channel.type !== 'dm') return;

    let args = messageContent
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();
    args = args.join(' ');

    let response = null;

    switch(command) {
    case 'start':
        response = '**You\'re all set up!** 🎉\n\nYou\'ll hear from me soon. In the meantime, you can tell me more about yourself by using the commands below ✨ Some of the information will be shared with your buddy to facilitate meetings.';
        response += '\n\n' + help;
        break;
    case 'stop':
        response = 'Done, you\'ll no longer be paired with new Fellows. Resume anytime with `!start`. Talk soon! 👋';
        break;
    case 'help':
        response = help;
        break;
    case 'github':
        response = '**GitHub** link set! 🎉';
        break;
    case 'linkedin':
        response = '**LinkedIn** link set! 🎉';
        break;
    case 'pronouns':
        response = '**Pronouns** set! 🎉';
        break;
    case 'funfact':
        response = '**Fun fact** set! 🎉';
        break;
    default:
        response = 'Unrecognized command. Reply with `!help` for a full list of commands.';
        break;
    }

    if (response === null) return;

    // Send welcome if it's the first time user messages bot
    message.channel.messages.fetch().then(messages => {
        const botMessages = messages.filter(msg => msg.author.bot);
        if (botMessages.size === 0) {
            message.author.send(`👋😃 Hello! \n\nI'm here to help you get to know new Fellows from other Pods. If you decide to participate, I'll pair you with a new person every week for a short, informal, and fun 1-on-1. It's a great way to get to know more people when working remotely! 🙌\n\nAll you have to do is reply here with \`start\`. You'll be to able \`stop\` anytime.`);
        } else {
            message.author.send(response);
        }
    }).catch(err => {
        console.log(err);
    });
});
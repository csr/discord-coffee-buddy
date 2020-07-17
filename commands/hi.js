require('dotenv').config();
const { Message } = require('discord.js');
const { UserService } = require('../services/userService.js');
const { User } = require('../models');

const prefix = process.env.PREFIX || '!';

/**
 *
 * @param {Message} message
 * @param {*} args
 */
const run = async (message, args) => {
    message.author.send(`👋😃 Hello! \n\nI'm here to help you get to know new Fellows from other Pods. If you decide to participate, I'll pair you with a new person every week for a short, informal, and fun 1-on-1. It's a great way to get to know more people when working remotely! 🙌\n\nAll you have to do is reply here with **${prefix + 'start'}**. You'll be to able to **${prefix + 'stop'}** anytime.`);
};

module.exports = {
    run,
    name: 'hi',
    description: 'Sends welcome message',
};

require('dotenv').config();
const { Client } = require('discord.js');
const { User } = require('../../models');
const createChannel = require('./../create-channel');
const { UserService } = require('./../../services/userService');

const svc = new UserService(User);

/**
 * @see https://stackoverflow.com/a/44996257
 * @param {string[]} array
 */
const pairArray = (array) => {
    return array.reduce(function(result, value, index, array) {
        if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
        return result;
    }, []);
}

/**
 * @see https://stackoverflow.com/a/12646864
 * @param {string[]} array 
 */
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

const getRandomUsers = async () => {
    let userIDSet = [];
    const users = await svc.findAll();

    if (!Object.keys(users).length) {
        console.log('DAMN! There are no users enrolled yet. What a bummer!');
    }

    for (const user of users) {
        userIDSet.push(user.discordId);
    }

    const shuffledUserIDs = shuffleArray(userIDSet);
    const pairedUserIDs = pairArray(shuffledUserIDs);

    return pairedUserIDs;
}

/**
 * 
 * @param {Client} client 
 */
const runScheduler = async (client) => {
    console.log('Running the scheduler. Time to match people up. Yuhu!');

    const users = await getRandomUsers();

    // FIXME: There is a serious bug invovled which needs to be fixed ASAP
    // If the array that is being returned is not a pair, then this function would fail
    // We need to handle this edge case and report it gracefully
    for (const pair of users) {
        // TODO: Save into meetings category
        // For now just creates the channels required.
        createChannel(client, pair[0], pair[1])
    }
}

module.exports = runScheduler;

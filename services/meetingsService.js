const { User } = require('../models');
const { BaseService } = require('./baseService');
const Sequelize = require('sequelize');
const { Meetings } = require('../models');

class MeetingService extends BaseService {
    //function that checks if user1 has a meeting set-up
    assertUserIsScheduled = async (discordId) => {
        //might need something to check if user is scheduled?
    };

    //function that checks if user1 has met with user2 before
    uniqueMeeting = async (discordId) => {
        try {     //if not, they are a match
            const user

        } catch (error) {           //if so find another user2
            return;
        }
    };

    //function the prints all meetings for 1 user
    printSchedule = async (discordId) => {
        include:{
            model: model.Meetings 
            model: model.User
        }
        console.log( "result=====>",result);
        result.forEach((user, index, arr) => {
            console.log('User: ' + user.username + '\n' + user.linkedin + '\n' + user.github + '\n' + user.funfact );
            user.project.forEach((projects, index, arr) => {
                console.log('ID: "' + project.title + '": ' + project.description + '\n');
            });
        }
    };

    //function that updates the meeting table in the DB
}
module.exports = { MeetingService};
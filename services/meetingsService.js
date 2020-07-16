const { User } = require('../models');
const { BaseService } = require('./baseService');
const Sequelize = require('sequelize');
const { Meetings } = require('../models');

class MeetingService extends BaseService {
    createMeeting = async (discordId1, discordId2) => {
        console.log(discordId1 + ' ' + discordId2);
        const meeting = await this.create({ discordId1, discordId2 });
        return meeting;
    };
    getUserMeetings = async (id) => {
        const allowedFields = ['id', 'discordId1', 'discordId2'];
        try {
            const meetings1 = await this.findAll(
                {
                    discordId1: id,
                },
                allowedFields
            );
            const meetings2 = await this.findAll(
                {
                    discordId2: id,
                },
                allowedFields
            );
            return meetings1.concat(meetings2);
        } catch (error) {
            return false;
        }
    };
}
module.exports = { MeetingService };

//sample
// svc = new MeetingService(Meetings);
// const xyz = async (id) => {
//     try {
//         const meetings = await svc.getUserMeetings('40');
//         console.log(meetings);
//         // for (let i = 1; i < 50; i++) {
//         //     await svc.createMeeting(i.toString(), (i + 1).toString());
//         // }
//     } catch (e) {
//         throw e;
//     }
// };

// xyz('test');

// const Sequelize = require('sequelize');
// const { User } = sequelize.models;
const { User } = require('../models');
const { BaseService } = require('./baseService');
class UserService extends BaseService {
    updateByDiscordId = async (discordId, updateBody) => {
        const updatedBody = await this.update(updateBody, { discordId });
        return updatedBody;
    };
}
module.exports = { UserService };

// Sample use
// svc = new UserService(User);
// const xyz = async (id) => {
//     try {
//         const w = await svc.create({
//             discordId: id,
//         });
//         // changing enroll status, updating linkedin and adding funfact.
//         await svc.updateByDiscordId(id, {
//             linkedin: 'www.linkedin.com/ksdk',
//             funfact: 'Random funfact',
//             enrolled:true
//         });
//         const www = await svc.findOne({ discordId: id });
//         console.log(www);
//     } catch (e) {
//         throw e;
//     }
// };

// xyz();

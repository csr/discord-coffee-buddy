// const Sequelize = require('sequelize');
// const { User } = sequelize.models;
const { User } = require('../models');
const { BaseService } = require('./baseService');
class UserService extends BaseService {
    assertUserIsRegistered = async (discordId) => {
        try {
            await this.findOne({ discordId });
        } catch (e) {
            throw new Error(
                "It seems you're not registered. Type `!start` to register right away!"
            );
        }
    };
    updateByDiscordId = async (discordId, updateBody) => {
        await this.assertUserIsRegistered();
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

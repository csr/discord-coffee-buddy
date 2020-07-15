// const Sequelize = require('sequelize');
// const { User } = sequelize.models;
const { User } = require('../models');
const { BaseService } = require('./baseService');
const Sequelize = require('sequelize');
class UserService extends BaseService {
    assertUserIsRegistered = async (discordId) => {
        const user = await this.findOne({ discordId });
        if (!user && !user.enrolled) {
            throw new Error(
                "It seems you're not enrolled. Type `!start` to enroll right away!"
            );
        }
    };
    prettifyError = (error) => {
        if (error instanceof Sequelize.UniqueConstraintError) {
            return new Error(
                `You've already created an account! Try the other commands!`
            );
        }
        return error;
    };
    updateByDiscordId = async (discordId, updateBody) => {
        await this.assertUserIsRegistered(discordId);
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

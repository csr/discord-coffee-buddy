// const Sequelize = require('sequelize');
// const { User } = sequelize.models;
const { User } = require('../models');
const { BaseService } = require('./baseService');
const Sequelize = require('sequelize');
class UserService extends BaseService {
    assertUserIsRegistered = async (discordId) => {
        const user = await this.userExists(discordId);
        if (!user || !user.enrolled) {
            throw new Error(
                "It seems you're not enrolled. Type `!start` to enroll right away!"
            );
        }
    };
    userExists = async (discordId) => {
        try {
            const user = await this.findOne({ discordId });
            return user;
        } catch (error) {
            return false;
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
    createUser = async ({ discordId }) => {
        const user = await this.userExists(discordId);
        if (user && user.enrolled) {
            throw new Error('You are already enrolled! 😃');
        } else if (!user) {
            await this.create({ discordId, enrolled: true });
        } else if (user && !user.enrolled) {
            await this.update({ enrolled: true }, { discordId });
        }
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

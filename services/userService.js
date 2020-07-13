// const Sequelize = require('sequelize');
// const { User } = sequelize.models;
const { User } = require('../models');
const { BaseService } = require('./baseService');
class UserService extends BaseService {}

svc = new UserService(User);

// Sample use case
// const xyz = async () => {
//     try {
//         // const r = await svc.create({ discord_id: '12323123' });
//         const w = await svc.findOne({
//             discord_id: '12323123',
//         });
//         console.log(w);
//     } catch (e) {
//         throw e;
//     }
// };

// xyz();

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Meetings extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };

    Meetings.init({
        discordId1: DataTypes.STRING,
        discordId2: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Meetings',
    });

    return Meetings;
};

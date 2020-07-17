'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
};

User.init({
    username: DataTypes.STRING,
    discordId: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    github: DataTypes.STRING,
    funfact: DataTypes.STRING,
    pronouns: DataTypes.STRING,
    enrolled: DataTypes.BOOLEAN
}, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
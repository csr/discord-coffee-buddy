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
    linkedin: DataTypes.STRING,
    github: DataTypes.STRING,
    funfact: DataTypes.STRING,
    pronouns: DataTypes.STRING,
    enrolled: DataTypes.BOOLEAN,
    discord_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
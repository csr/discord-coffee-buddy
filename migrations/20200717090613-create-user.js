'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'funfact', 'bio');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('tableName', 'bio', 'funfact');
  }
};
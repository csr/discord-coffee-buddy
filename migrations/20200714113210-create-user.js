'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            username: {
                type: Sequelize.STRING,
            },
            discordId: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            linkedin: {
                type: Sequelize.STRING,
                default: '',
            },
            github: {
                type: Sequelize.STRING,
                default: '',
            },
            funfact: {
                type: Sequelize.STRING,
                default: '',
            },
            pronouns: {
                type: Sequelize.STRING,
                default: '',
            },
            enrolled: {
                type: Sequelize.BOOLEAN,
                default: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    },
};

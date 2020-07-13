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
            linkedin: {
                type: Sequelize.STRING,
            },
            github: {
                type: Sequelize.STRING,
            },
            funfact: {
                type: Sequelize.STRING,
            },
            pronouns: {
                type: Sequelize.STRING,
            },
            enrolled: {
                type: Sequelize.BOOLEAN,
            },
            discord_id: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
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

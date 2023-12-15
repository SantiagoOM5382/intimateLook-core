'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      return Promise.all([
        await queryInterface.createTable('countries', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
        }, { transaction: t }),

        await queryInterface.createTable('states', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          country_id: {
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
        }, { transaction: t }),

        await queryInterface.createTable('cities', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          state_id: {
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
        }, { transaction: t }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cities');
    await queryInterface.dropTable('states');
    await queryInterface.dropTable('countries');
  }
};

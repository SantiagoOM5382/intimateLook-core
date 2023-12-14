'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('girls', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      phone: {
        type: Sequelize.STRING, // O el tipo de dato apropiado según tus necesidades
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      district: {
        type: Sequelize.STRING,
        allowNull: true
      },
      document: {
        type: Sequelize.STRING,
        allowNull: true
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      admin_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('girls');
  }
};

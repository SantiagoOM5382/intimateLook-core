'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
        set (value) {
          this.setDataValue('password', value ? bcrypt.hashSync(value, 12) : null)
        }
      },
      is_agency: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      tokens: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('admins')
  }
};



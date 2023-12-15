'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn('girls', 'state_id', {
      type: Sequelize.UUID,
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'states',
        key: 'id',
        as: 'state_id'
      }
    });

    await queryInterface.addColumn('girls', 'city_id', {
      type: Sequelize.UUID,
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'cities',
        key: 'id',
        as: 'city_id'
      }
    });

    await queryInterface.addColumn('girls', 'images', {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
      defaultValue: [],
    });

    await queryInterface.removeColumn('girls', 'state');
    await queryInterface.removeColumn('girls', 'city');
    await queryInterface.removeColumn('girls', 'image');
  },

  down: async (queryInterface, Sequelize) => {
    // Revierte los cambios realizados en el método up
    await queryInterface.removeColumn('girls', 'state_id');
    await queryInterface.removeColumn('girls', 'city_id');
    await queryInterface.removeColumn('girls', 'images');

  }
};

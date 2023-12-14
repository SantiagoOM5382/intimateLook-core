const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

class City extends Model {}

City.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'cities',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = City;

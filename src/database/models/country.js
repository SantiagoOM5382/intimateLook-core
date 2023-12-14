// models/country.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

class Country extends Model {}

Country.init({
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
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'countries',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Country;

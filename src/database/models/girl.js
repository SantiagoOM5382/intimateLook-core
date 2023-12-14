const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class Girl extends Model {}

Girl.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true
  },
  document: {
    type: DataTypes.STRING,
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  admin_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  modelName: 'girls',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
});

module.exports = Girl;

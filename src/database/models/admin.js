const bcrypt = require('bcryptjs')
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection')

class Admin extends Model { }

Admin.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    set (value) {
      this.setDataValue('email', value?.trim())
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    set (value) {
      this.setDataValue('password', value ? bcrypt.hashSync(value, 12) : null)
    }
  },
  is_agency: {
    type: DataTypes.BOOLEAN,
    allowNull: false, 
  },
  tokens: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  modelName: 'admins',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})

module.exports = Admin

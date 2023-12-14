const Sequelize = require('sequelize')

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DRIVER,
        port: process.env.DB_PORT,
      }
    );


module.exports = sequelize
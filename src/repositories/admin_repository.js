const Admin = require('../database/models/admin')
const Repository = require('./repository')

class AdminRepository extends Repository {
  constructor () {
    super()
    this.model = Admin
  }
}

module.exports = AdminRepository

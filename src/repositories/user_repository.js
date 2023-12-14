const User = require('../database/models/user')
const Repository = require('./repository')

class UserRepository extends Repository {
  constructor () {
    super()
    this.model = User
  }
}

module.exports = UserRepository

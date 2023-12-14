const Girl = require('../database/models/girl')
const Repository = require('./repository')

class GirlRepository extends Repository {
  constructor () {
    super()
    this.model = Girl
  }
}

module.exports = GirlRepository

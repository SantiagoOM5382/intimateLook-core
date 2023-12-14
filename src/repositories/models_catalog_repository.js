const ModelsCatalog = require('../database/models/models_catalog')
const Repository = require('./repository')

class ModelsCatalogRepository extends Repository {
  constructor () {
    super()
    this.model = ModelsCatalog
  }
}

module.exports = ModelsCatalogRepository

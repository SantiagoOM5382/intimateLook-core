const { NotFoundError } = require('../helpers/exceptions_errors')
const { responseCode, http, error } = require('../helpers/request')

class Service {
  constructor (repository) {
    this.repository = repository
    this.model = 'Modelo'
  }

  /*
  * -----------------------------------------------------------------------
  * Obtiene un array de resultados con todos los registros del modelo
  *
  * -----------------------------------------------------------------------
  */
  async getAll (res, brandId) {
    const data = await this.repository.getAll(brandId)
    return res
      .status(responseCode.OK)
      .json(http.response(data, responseCode.OK, `Lista de ${this.model}`))
  }

  /*
  * -----------------------------------------------------------------------
  * Obtiene los resultados de un adomi componente específico según su UUID
  *
  * -----------------------------------------------------------------------
  */
  async get (res, id) {
    const data = await this.repository.getById(id)

    // Valida si la data existe
    if (!data) {
      return res
        .status(responseCode.NOT_FOUND)
        .json(error.resourceDoesNotExist)
    }

    return res
      .status(responseCode.OK)
      .json(http.response(data, responseCode.OK, `${this.model} de id ${id}`))
  }

  /*
  * -----------------------------------------------------------------------
  * Elimina un adomi componente por su id
  *
  * -----------------------------------------------------------------------
  */
  async remove (res, id) {
    // Find the data
    const data = await this.repository.getById(id)

    // Validate that data exists
    if (!data) {
      return res
        .status(responseCode.NOT_FOUND)
        .json(error.resourceDoesNotExist)
    }

    // Remove data
    await this.repository.remove(id)

    return res
      .status(responseCode.NO_CONTENT)
      .json(http.response(null, responseCode.NO_CONTENT, `${this.model} eliminado`))
  }

  async isExist (id, message) {
    const exist = await this.repository.getById(id)
    if (!exist) throw new NotFoundError(message)
    return exist
  }
}

module.exports = Service

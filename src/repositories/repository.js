class Repository {
  constructor () {
    this.model = undefined
  }

  /*
  * -----------------------------------------------------------------------
  * Obtiene un array de todos los valores de un modelo
  *
  * -----------------------------------------------------------------------
  */
  async getAll () {
    return await this.model.findAll()
  }

  /*
  * -----------------------------------------------------------------------
  * Obtiene un array de todos los valores de un modelo por condicional
  *
  * -----------------------------------------------------------------------
  */
  async get (options = {}) {
    return await this.model.findAll(options)
  }

  /*
  * -----------------------------------------------------------------------
  * Obtiene un objeto del valor de un modelo por condicional
  *
  * -----------------------------------------------------------------------
  */

  async getOne (options = {}) {
    return await this.model.findOne(options)
  }

  /*
  * -----------------------------------------------------------------------
  * Obtiene un array de todos los valores de un modelo por condicional
  * y devuelve filas y cantidad de registros encontrados
  *
  * -----------------------------------------------------------------------
  */
  async getAndCount (options = {}) {
    return await this.model.findAndCountAll(options)
  }

  async count (options = {}) {
    return await this.model.count(options)
  }

  /*
  * -----------------------------------------------------------------------
  * Obtiene un objeto de un modelo según su UUID
  *
  * -----------------------------------------------------------------------
  */
  async getById (id, options = {}) {
    return await this.model.findByPk(id, options)
  }

  async getBySlug (slug) {
    return await this.model.findOne({ where: { slug: slug } })
  }

  /*
  * -----------------------------------------------------------------------
  * Crea un nuevo registro en la base de datos
  *
  * -----------------------------------------------------------------------
  */

  async create (body) {
    return await this.model.create(body)
  }

  async bulkCreate (data) {
    return await this.model.bulkCreate(data)
  }

  /*
  * -----------------------------------------------------------------------
  * Actualiza un registro de la base de datos según su UUID
  *
  * -----------------------------------------------------------------------
  */
  async update (id, body) {
    return await this.model.update(body, { where: { id }, returning: true })
  }

  /*
  * -----------------------------------------------------------------------
  * Elimina un registro de la base de datos según su UUID
  *
  * -----------------------------------------------------------------------
  */
  async remove (id) {
    return await this.model.destroy({ where: { id } })
  }
}

module.exports = Repository

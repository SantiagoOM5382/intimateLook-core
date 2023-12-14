const axios = require('axios')
const Brand = require('../database/models/brand')
const { NotFoundError, ServerError } = require('./exceptions_errors')

class Http {
  constructor (brandId, endpoint) {
    this.microservice = process.env.ENVIA_QUERY_API
    this.endpoint = endpoint
    this.brandId = brandId
    this.params = ''
  }

  async getToken () {
    const brand = await Brand.findByPk(this.brandId, { attributes: ['envia_token'] })
    if (!brand) throw new NotFoundError('La marca no existe')
    return brand.envia_token
  }

  setMicroService (microservice) {
    switch (microservice) {
      case 'query': {
        this.microservice = process.env.ENVIA_QUERY_API
        break
      }
      case 'api': {
        this.microservice = process.env.ENVIA_API
        break
      }
      case 'orders': {
        this.microservice = process.env.ORDERS_API
      }
    }
  }

  setEndpoint (endpoint) {
    this.endpoint = endpoint
  }

  setParams (params) {
    this.params = params
  }

  buildUrl (param = null) {
    const endpoint = param !== null ? `${this.endpoint}/${param}` : this.endpoint
    const params = this.params !== '' ? `?${this.params}` : ''

    return `${this.microservice}/${endpoint}${params}`
  }

  async get (param = null, useToken = true) {
    const token = useToken ? await this.getToken() : null
    try {
      const response = await axios.get(this.buildUrl(param), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token !== null ? `Bearer ${token}` : '',
          'x-api-key': this.microservice === process.env.ORDERS_API ? process.env.ORDERS_API_KEY : ''
        }
      })
      return response.data
    } catch (e) {
      let error = e.message
      if (e.response) {
        error = e.response.data.message
        console.error(error)
      } else if (e.request) {
        console.error(e.request)
      }

      throw new ServerError(error)
    }
  }

  async post (data, useToken = true) {
    const token = useToken ? await this.getToken() : null

    try {
      const response = await axios.post(this.buildUrl(), data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token !== null ? `Bearer ${token}` : '',
          'x-api-key': this.microservice === process.env.ORDERS_API ? process.env.ORDERS_API_KEY : ''
        }
      })

      return response.data
    } catch (e) {
      let error = e.message
      if (e.response) {
        error = e.response.data.message
        console.error(error)
      } else if (e.request) {
        console.error(e.request)
      }
      throw new ServerError(error)
    }
  }

  async put (param, data, useToken = true) {
    const token = useToken ? await this.getToken() : null

    try {
      const response = await axios.put(this.buildUrl(param), data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token !== null ? `Bearer ${token}` : '',
          'x-api-key': this.microservice === process.env.ORDERS_API ? process.env.ORDERS_API_KEY : ''
        }
      })

      return response.data
    } catch (e) {
      let error = e.message
      if (e.response) {
        error = e.response.data.message
        console.error(error)
      } else if (e.request) {
        console.error(e.request)
      }

      throw new ServerError(error)
    }
  }

  async delete (param, useToken = true) {
    const token = useToken ? await this.getToken() : null

    try {
      const response = await axios.delete(this.buildUrl(param), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token !== null ? `Bearer ${token}` : '',
          'x-api-key': this.microservice === process.env.ORDERS_API ? process.env.ORDERS_API_KEY : ''
        }
      })
      return response.data
    } catch (e) {
      let error = e.message
      if (e.response) {
        error = e.response.data.message
        console.error(error)
      } else if (e.request) {
        console.error(e.request)
      }

      throw new ServerError(error)
    }
  }
}

module.exports = Http

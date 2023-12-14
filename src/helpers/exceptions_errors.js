const getStatusNameByException = (e) => {
  const { name } = e
  if (name?.includes('Sequelize') | name?.includes('SERVER')) return 'SERVER_ERROR'
  else if (name?.includes('NOT_FOUND')) return 'NOT_FOUND'
  else if (name?.includes('CONFLICT')) return 'CONFLICT'
  else if (name?.includes('PERMISSION_DENIED')) return 'PERMISSION_DENIED'
  return 'BAD_REQUEST'
}

class NotFoundError extends Error {
  constructor (message, data = null) {
    super(message)
    this.name = 'NOT_FOUND'
    this.message = message
    this.data = data
  }
}

class ServerError extends Error {
  constructor (message, data = null) {
    super(message)
    this.name = 'SERVER'
    this.message = message
    this.data = data
  }
}

class ConflictError extends Error {
  constructor (message, data = null) {
    super(message)
    this.name = 'CONFLICT'
    this.message = message
    this.data = data
  }
}

class PermissionDeniedError extends Error {
  constructor (message, data = null) {
    super(message)
    this.name = 'PERMISSION_DENIED'
    this.message = message
    this.data = data
  }
}

module.exports = { NotFoundError, ServerError, ConflictError, PermissionDeniedError, getStatusNameByException }

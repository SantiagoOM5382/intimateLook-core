const _ = require('lodash')

const responseCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_AUTHORIZED: 401,
  PERMISSION_DENIED: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500
}

const response = {
  data: null,
  message: null,
  code: responseCode.OK,
  errors: []
}

const http = {
  methodPost: 'POST',
  methodGet: 'GET',
  methodPut: 'PUT',
  methodPatch: 'PATCH',
  methodDelete: 'DELETE',
  isNotApplicationJson: (req) => !req.is('application/json'),
  error: (data = null, code = responseCode.BAD_REQUEST, errors = []) => ({ ...response, data, code, errors }),
  response: (data = null, code = responseCode.OK, message = null) => ({ ...response, data, code, message })
}

const error = {
  imageResizeError: {
    ...response,
    errors: ['Ocurrió un error al redimensionar la imagen'],
    code: responseCode.BAD_REQUEST
  },
  invalidImageFormat: {
    ...response,
    errors: ['El formato de la imagen es inválido. Formatos aceptados .png, .jpg, .jpeg y .gif'],
    code: responseCode.BAD_REQUEST
  },
  invalidDocumentFormat: {
    ...response,
    errors: ['El formato del documento es inválido. Formato aceptado .pdf'],
    code: responseCode.BAD_REQUEST
  },
  invalidDriverDocumentType: {
    ...response,
    errors: ['El tipo del documento es inválido. Tipos aceptados: identification y license'],
    code: responseCode.BAD_REQUEST
  },
  invalidVehicleDocumentType: {
    ...response,
    errors: ['El tipo del documento del vehículo es inválido. Tipos aceptados: soat, rtm, vehicle_license y license_plate'],
    code: responseCode.BAD_REQUEST
  },
  contentTypeIsInvalid: {
    ...response,
    errors: ['Content-Type es inválido'],
    code: responseCode.BAD_REQUEST
  },
  authorizationHeaderDoesntExist: {
    ...response,
    errors: ['No autorizado. El token es requerido'],
    code: responseCode.NOT_AUTHORIZED
  },
  forbidden: {
    ...response,
    errors: ['Acceso denegado. El token no tiene permisos para esta acción'],
    code: responseCode.PERMISSION_DENIED
  },
  apiKeyHeaderDoesntExist: {
    ...response,
    errors: ['No autorizado. El api-key es requerido'],
    code: responseCode.NOT_AUTHORIZED
  },
  invalidApiKey: {
    ...response,
    errors: ['No autorizado. El api-key no es válido'],
    code: responseCode.NOT_AUTHORIZED
  },
  invalidToken: {
    ...response,
    errors: ['No autorizado. El token no es válido'],
    code: responseCode.NOT_AUTHORIZED
  },
  expiredToken: {
    ...response,
    errors: ['No autorizado. El token ya expiró'],
    code: responseCode.NOT_AUTHORIZED
  },
  queryParamIsNotInteger: {
    ...response,
    errors: ['El parámetro de entrada debe ser un número entero'],
    code: responseCode.BAD_REQUEST
  },
  resourceDoesNotExist: {
    ...response,
    errors: ['El recurso no existe en base de datos'],
    code: responseCode.NOT_FOUND
  },
  clientDoesNotExist: {
    ...response,
    errors: ['El cliente no existe en base de datos'],
    code: responseCode.NOT_FOUND
  },
  typeIsNotInteger: {
    ...response,
    errors: ['El parámetro debe ser un número entero'],
    code: responseCode.BAD_REQUEST
  },
  typeIsNotString: {
    ...response,
    errors: ['El parámetro debe ser un string'],
    code: responseCode.BAD_REQUEST
  },
  creatingWasNotPossible: {
    ...response,
    errors: ['Ha ocurrido un error al momento de crear el recurso'],
    code: responseCode.SERVER_ERROR
  },
  updatingWasNotPossible: {
    ...response,
    errors: ['Ha ocurrido un error al momento de actualizar el recurso'],
    code: responseCode.SERVER_ERROR
  },
  someFieldsAreRequired: {
    ...response,
    errors: ['No se recibieron algunos recursos que son requeridos'],
    code: responseCode.BAD_REQUEST
  },
  driverAlreadyLinkedToBranchOffice: {
    ...response,
    errors: ['El repartidor ya esta vinculado a esta sucursal'],
    code: responseCode.BAD_REQUEST
  },
  driverNotLinkedToBranchOffice: {
    ...response,
    errors: ['El repartidor no esta vinculado a esta sucursal'],
    code: responseCode.BAD_REQUEST
  },
  driverAlreadyLinkedToOrder: {
    ...response,
    errors: ['El repartidor ya esta vinculado a esta orden'],
    code: responseCode.BAD_REQUEST
  },
  driverNotLinkedToOrder: {
    ...response,
    errors: ['El repartidor no esta vinculado a esta orden'],
    code: responseCode.BAD_REQUEST
  },
  serverError: (message) => ({
    ...response,
    errors: [message, 'Ocurrió un error en el servidor'],
    code: responseCode.SERVER_ERROR
  }),
  fieldsMustBeRequired: (fields) => {
    const errors = []
    let concatenatedFields = ''

    // eslint-disable-next-line array-callback-return
    fields.map((field, index) => {
      if (fields.length > 1 && index === (fields.length - 1)) {
        concatenatedFields = `${concatenatedFields.substring(0, concatenatedFields.length - 2)} y ${field}, `
        // eslint-disable-next-line array-callback-return
        return
      }

      concatenatedFields += `${field}, `
    })

    if (fields.length > 1) {
      errors.push(`Los campos ${concatenatedFields.substring(0, concatenatedFields.length - 2)} son obligatorios`)
    } else {
      errors.push(`El campo ${concatenatedFields.substring(0, concatenatedFields.length - 2)} es obligatorio`)
    }

    return {
      ...response,
      errors,
      code: responseCode.BAD_REQUEST
    }
  },
  typesAreWrong: (types) => {
    const errors = []
    let concatenatedTypes = ''

    // eslint-disable-next-line array-callback-return
    types.map((type, index) => {
      if (types.length > 1 && index === (types.length - 1)) {
        concatenatedTypes = `${concatenatedTypes.substring(0, concatenatedTypes.length - 2)} y ${type}, `
        // eslint-disable-next-line array-callback-return
        return
      }

      concatenatedTypes += `${type}, `
    })

    if (types.length > 1) {
      errors.push(`Algunos campos tienen types incorrectos. Los types correctos deben ser ${concatenatedTypes.substring(0, concatenatedTypes.length - 2)}`)
    } else {
      errors.push(`Uno de los campos tiene un type incorrecto. El type correcto debe ser ${concatenatedTypes.substring(0, concatenatedTypes.length - 2)}`)
    }

    return {
      ...response,
      errors,
      code: responseCode.BAD_REQUEST
    }
  },
  resourceMustBeUnique: (field) => ({
    ...response,
    errors: [`Ya existe un repartidor con el mismo campo ${field}`],
    code: responseCode.BAD_REQUEST
  }),
  resourceExists: (message) => ({
    ...response,
    errors: [message],
    code: responseCode.BAD_REQUEST
  })
}

const checkTypes = (x) => {
  let r

  switch (x.type.toLowerCase()) {
    case 'integer':
      r = _.isInteger(x.value)
      break
    case 'array':
      r = _.isArray(x.value)
      break
    case 'object':
      r = _.isObject(x.value)
      break
    case 'string':
      r = _.isString(x.value)
      break
    case 'boolean':
      r = _.isBoolean(x.value)
      break
    case 'number':
      r = _.isNumber(x.value)
      break
    default:
      r = true
  }

  return r
}

const validator = {
  required: (fields, required) => {
    const mustBeRequired = []

    // eslint-disable-next-line array-callback-return
    required.map((requiredField) => {
      if (fields[requiredField] === undefined || fields[requiredField] === null) {
        mustBeRequired.push(requiredField)
      }
    })

    return [mustBeRequired, mustBeRequired.length === 0]
  },
  type: (fields) => {
    const typesAreWrong = []

    // eslint-disable-next-line array-callback-return
    fields.map((field) => {
      if (field.value !== undefined) {
        if (!checkTypes(field)) {
          typesAreWrong.push(`${field.field}(${field.type})`)
        }
      }
    })

    return [typesAreWrong, typesAreWrong.length === 0]
  }
}

module.exports = {
  http,
  error,
  validator,
  responseCode
}

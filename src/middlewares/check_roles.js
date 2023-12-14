// Helpers
const { responseCode, http } = require('../helpers/request')

function checkRoles (roles) {
  return (req, res, next) => {
    try {
      // Verify checkRoles
      if (roles.includes(req?.userType)) {
        next()
      } else {
        return res
          .status(responseCode.NOT_AUTHORIZED)
          .json(http.error(null, responseCode.NOT_AUTHORIZED,
            ['No autorizado. El usuario no tiene permisos para esta acción']))
      }
    } catch (error) {
      return res
        .status(responseCode.BAD_REQUEST)
        .json(http.error(null, responseCode.BAD_REQUEST, [error.message]))
    }
  }
}

module.exports = checkRoles

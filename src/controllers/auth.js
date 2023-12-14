const AdminService = require('../services/admin_service')
const { http, error, validator, responseCode } = require('../helpers/request')

class AuthController {

    static async adminRegister (req, res) {
        try {
        const data = req.body
        return res.json(await AdminService.create(data))
        } catch (e) {
        return res
            .status(responseCode.SERVER_ERROR)
            .json(http.error(null, responseCode.SERVER_ERROR, [e.message]))
        }
    }

  static async adminLogin (req, res) {
    try {
      const data = req.body
      return res.json(await AdminService.login(data))
    } catch (e) {
      return res
        .status(responseCode.SERVER_ERROR)
        .json(http.error(null, responseCode.SERVER_ERROR, [e.message]))
    }
  }
}

module.exports = AuthController

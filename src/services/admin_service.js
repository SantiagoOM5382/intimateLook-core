const bcrypt = require('bcryptjs')
const tokenize = require('../helpers/tokenize')
const Service = require('./service')
const { http, responseCode, error, validator } = require('../helpers/request')

const Admin = require('../database/models/admin')
const AdminRepository = require('../repositories/admin_repository')

class AdminService extends Service {
  constructor () {
    super(new AdminRepository())
    this.repository = new AdminRepository()
  }

  static async create (data) {
    const admin = await Admin.create(data)
    return http.response(admin, responseCode.OK, 'Nuevo administrador creado con éxito')
  }

  static async login (data) {
    const admin = await Admin.findOne({ where: { email: data.email } })

    if (!admin || !admin.email || !bcrypt.compareSync(data.password, admin.password)) {
      return http.error(null, responseCode.NOT_AUTHORIZED, ['El correo y la contraseña no coinciden'])
    }

    if (admin?.status === 'inactive') {
      return http.error(null, responseCode.PERMISSION_DENIED, ['Esta cuenta de administrador esta desactivada'])
    }

    delete admin.dataValues.password
    const token = tokenize.create(admin.id, 'ADMIN')
    return http.response({ data: { ...admin.dataValues, is_admin: true }, token }, responseCode.OK, 'Autenticación exitosa')
  }
}

module.exports = AdminService

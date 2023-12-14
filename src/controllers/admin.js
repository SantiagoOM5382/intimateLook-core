const Controller = require('../decorators/controller')
const AdminService = require('../services/admin_service')

class AdminController {
  constructor () {
    this.service = new AdminService()
  }

  async index () {
    const data = await this.service.index()
    return [data, 'Get data admin successfully']
  }
}

const adminController = new AdminController()
const controller = new Controller(adminController)

module.exports = controller

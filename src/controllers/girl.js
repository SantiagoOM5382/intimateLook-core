const Controller = require('../decorators/controller')
const GirlService = require('../services/girl_service')

class GirlController {
  constructor () {
    this.service = new GirlService()
  }

  async getAll(req) {
    const filters = req.query;
    const girls = await this.service.getAll(filters);
    return [girls, 'good'];
  }
  
  async getById (req) {
    const id = req.params.id
    const girl = await this.service.getById(id)
    return [girl, 'Get girl byId is succesfull']
  }

  async getByAdminId(req) {
    const admin_id = req.params.adminId;
    const girls = await this.service.getByAdminId(admin_id);
    return [girls, 'Get girls by AdminId is successful'];
  }
  
  async create (req) {
    const adminId = req.user.id;
    const data = req.body
    const girl = await this.service.create(data, adminId);
    return [girl, 'The new girl was created']
  }

  async update (req) {
    const id = req.params.id
    const data = req.body
    const girl = await this.service.update(id, data)
    return [girl, 'girl was succesfull']
  }

  async delete (req) {
    const id = req.params.id
    const girl = await this.service.delete(id)
    return [girl, 'Delete girl was succesfull']
  }
}

const girlController = new GirlController()
const controller = new Controller(girlController)

module.exports = controller

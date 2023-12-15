const Service = require('./service')
const GirlRepository = require('../repositories/girs_repository')

const Admin = require('../database/models/admin')
const Girl = require('../database/models/girl')

class GirlService extends Service {
  constructor () {
    super(new GirlRepository())
    this.repository = new GirlRepository()
  }



  async getAll(filters) {
    const state = filters.state;
    const city = filters.city;
    const category = filters.category;
  
    if (state && city && category) {
      const girl = await Girl.findAll({ where: { state_id: state, city_id: city, category: category } });
      return girl;
    } else if (state && city) {
      const girl = await Girl.findAll({ where: { state_id: state, city_id: city } });
      return girl;
    } else if (state && category) {
      const girl = await Girl.findAll({ where: { state_id: state, category: category } });
      return girl;
    } else if (state) {
      const girl = await Girl.findAll({ where: { state_id: state } });
      return girl;
    } else if (city) {
      const girl = await Girl.findAll({ where: { city_id: city } });
      return girl;
    } else if (category) {
      const girl = await Girl.findAll({ where: { category: category } });
      return girl;
    } else {
      const girl = await this.repository.getAll();
      return girl;
    }
  }
  
  async getById (id) {
    const girl = this.repository.getById(id)
    if (!girl) throw new NotFoundError('girl not found')
    return girl
  }

  async getByAdminId(admin_id) {
    const girls = await this.repository.getAll({ where: { admin_id: admin_id } });
    if (!girls || girls.length === 0) {
      throw new NotFoundError('No girls found for the provided admin_id');
    }
    return girls;
  }
  
  async create(data, admin_id) {
    const admin = await Admin.findByPk(admin_id);
    if (!admin) {
      return ('Admin not found');
    }
  
    if (!admin.is_agency && data.document) {
      const existingGirlWithSameDocument = await Girl.findOne({ where: { document: data.document, admin_id: admin_id } });
      if (existingGirlWithSameDocument) {
        const girl = await this.repository.create({ ...data, admin_id });
        return girl;
      }
      else {
        return ('Admin can only create girls with a unique document');
      }
    }
  
    // Resto de la lógica para crear la girl
    const girl = await this.repository.create({ ...data, admin_id });
    return girl;
  }
  
  async update (id, data) {
    const girl = await this.repository.getById(id)
    if (!girl) throw new NotFoundError('girl not found')
    const updateGirl = await this.repository.update(id, data)
    return updateGirl[1][0]
  }

  async delete (id) {
    const girl = await this.repository.getById(id)
    if (!girl) { throw new Error('girl not found') }
    const deleteGirl = await this.repository.remove(id)
    return deleteGirl
  }
}

module.exports = GirlService

const jwt = require('jwt-simple');
const dayjs = require('dayjs');
const { responseCode, error } = require('../helpers/request');
const Admin = require('../database/models/admin');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(responseCode.NOT_AUTHORIZED).send(error.authorizationHeaderDoesntExist);
    }

    const bearer = req.headers.authorization.split(' ')[0];

    if (bearer !== 'Bearer') {
      return res.status(responseCode.NOT_AUTHORIZED).send({
        data: null,
        message: null,
        errors: ['No autorizado. La estructura del token recibido es inválida'],
        code: responseCode.NOT_AUTHORIZED
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, process.env.TOKEN_SECRET_KEY);

    if (payload.exp <= dayjs().unix() || payload.sub.user_type !== 'ADMIN') {
      return res.status(responseCode.NOT_AUTHORIZED).json(error.invalidToken);
    }

    const user = await Admin.findByPk(payload.sub.user_id);

    if (!user) {
      throw new Error('Invalid token');
    }

    req.user = user.dataValues;
    req.userId = payload.sub.user_id;
    req.userType = payload.sub.user_type;
    req.isAdmin = true;
    req.token = token;
    next();
  } catch (e) {
    return res.status(responseCode.NOT_AUTHORIZED).send(error.invalidToken);
  }
};

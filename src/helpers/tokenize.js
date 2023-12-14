const jwt = require('jwt-simple')
const dayjs = require('dayjs')

module.exports = {
  create: (userId, type = 'UNKOWN') => {
    const payload = {
      sub: {
        user_id: userId,
        user_type: type.toUpperCase(),
        pusher_channel: `${type.toUpperCase()}_${userId}` // MANAGER_asd-123-asd-123-asd
      },
      iat: dayjs().unix(),
      exp: dayjs().add(3, 'month').endOf('month').unix()
    }
    return jwt.encode(payload, process.env.TOKEN_SECRET_KEY)
  }
}

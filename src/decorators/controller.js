const { getStatusNameByException } = require('../helpers/exceptions_errors')
const { responseCode, http } = require('../helpers/request')
const BaseController = require('./base_controller')

class Controller extends BaseController {
  constructor (controller) {
    super(controller)
    const prototypeThis = Object.getPrototypeOf(this)
    const prototypeController = Object.getPrototypeOf(this.Controller)
    const properties = Object.getOwnPropertyDescriptors(prototypeController)

    for (const methodName in properties) {
      if (typeof prototypeController[methodName] === 'function' && methodName !== 'constructor') {
        const originalMethod = prototypeController[methodName]
        prototypeThis[methodName] = async function (req, res) {
          try {
            const [result, message] = await originalMethod.call(controller, req)
            return res
              .status(responseCode.OK)
              .json(http.response(result, responseCode.OK, message))
          } catch (e) {
            const statusName = getStatusNameByException(e)
            return res
              .status(responseCode[statusName])
              .json(http.error(null, responseCode[statusName], [e.message]))
          }
        }
      }
    }
  }
}

module.exports = Controller

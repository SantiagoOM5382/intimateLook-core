const router = require('express').Router()
const AuthController = require('../../controllers/auth')


router.post(
  '/admin/register',
  AuthController.adminRegister
)

router.post(
    '/admin/login',
    AuthController.adminLogin
)


module.exports = router
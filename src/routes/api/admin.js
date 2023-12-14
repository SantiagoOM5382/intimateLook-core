const router = require('express').Router()
const adminController = require('../../controllers/admin')

router.get('/', adminController.index)

module.exports = router

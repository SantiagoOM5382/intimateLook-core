const router = require('express').Router()
const adminRouter = require('./api/admin')
const authRouter = require('./api/auth')
const girlRouter = require('./api/girl')

router.use('/admin', adminRouter)
router.use('/auth', authRouter)
router.use('/girl', girlRouter)

router.get('/', (req, res) => {
    res.json(http.response(null, responseCode.OK, 'Welcome to Adomi!'))

})
  

module.exports = router

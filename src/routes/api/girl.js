const router = require('express').Router()
const girlController = require('../../controllers/girl')

const authenticate = require('../../middlewares/authenticate')
const checkRoles = require('../../middlewares/check_roles')

router.get(
    '/',
    girlController.getAll
);

router.get(
    '/:id',
    girlController.getById
)

router.get(
    '/byAdminId/:id',
    authenticate,
    girlController.getByAdminId
  );

  
router.post(
    '/create',
    authenticate,
    checkRoles(['ADMIN']),
    girlController.create
)   
  
router.put(
    '/edit/:id',
    authenticate,
    checkRoles(['ADMIN']),
    girlController.update
)
  
router.delete(
    '/delete/:id',
    authenticate,
    checkRoles(['ADMIN']),
    girlController.delete
)
module.exports = router

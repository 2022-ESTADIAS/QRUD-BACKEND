const { Router } = require('express')
const { RolGet, RolPost, RolPut } = require('../controllers/rol.Controller')
const router = Router()


router.get('/',RolGet)
router.post('/',RolPost)
router.put('/:id',RolPut)



module.exports = router
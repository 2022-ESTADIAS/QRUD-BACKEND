const { Router } = require('express')
const { check } = require('express-validator')
const { RolGet, RolPost, RolPut, RolGetAll } = require('../controllers/rol.Controller')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()


router.get('/',RolGetAll)

//TODO: validaciones de rol para id.
router.get('/:id',RolGet)


router.post('/',[
    check('rol', 'El nombre del rol es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    validarCampos
],RolPost)
router.put('/:id',RolPut)



module.exports = router
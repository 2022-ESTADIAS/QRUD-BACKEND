const { Router } = require('express')
const { check } = require('express-validator')
const { RolGet, RolPost, RolPut, RolGetAll } = require('../controllers/rol.Controller')
const { rolExistID } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()


router.get('/',RolGetAll)


router.get('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(rolExistID),
    validarCampos
],RolGet)


router.post('/',[
    check('rol', 'El nombre del rol es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatorio').not().isEmpty(),
    validarCampos
],RolPost)
router.put('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(rolExistID),
    validarCampos
],RolPut)



module.exports = router
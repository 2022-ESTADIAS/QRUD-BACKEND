const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosGetAll } = require('../controllers/user.Controller')
const { emailExistUsuario, userExistID } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validarCampos')

const router = Router()


router.get('/',usuariosGetAll)

router.get('/:id',usuariosGet)

router.post('/',[
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExistUsuario ),
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    validarCampos
],usuariosPost)

router.put('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(userExistID),
    validarCampos
],usuariosPut)

router.delete('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(userExistID),
    validarCampos
],usuariosDelete)




module.exports = router
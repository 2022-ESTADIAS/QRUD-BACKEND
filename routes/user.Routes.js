const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosGetAll } = require('../controllers/user.Controller')
const { validarCampos } = require('../middlewares/validarCampos')

const router = Router()


router.get('/',usuariosGetAll)
router.get('/:id',usuariosGet)
router.post('/',[
    check('email', 'El correo no es válido').isEmail(),
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    validarCampos
],usuariosPost)
router.put('/:id',usuariosPut)
router.delete('/:id',usuariosDelete)




module.exports = router
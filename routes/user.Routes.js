const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosGetAll, usuariosGetAllEliminados, generarQRuser } = require('../controllers/user.Controller')
const { emailExistUsuario, userExistID } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validarCampos')
const {  validarTokens } = require('../middlewares/validarTokens')

const router = Router()


router.get('/',usuariosGetAll)


router.get('/eliminados', usuariosGetAllEliminados)



//TEST QR
router.get('/qr/:id',generarQRuser)
//==================================

router.get('/:id',usuariosGet)
//TODO:RFC al ultimo 
router.post('/',validarTokens,[
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExistUsuario ),
    check('telefono', 'El telefono no es valido').isMobilePhone('es-MX'),
    check('direccion', 'la direccion es obligatoria').not().isEmpty(),
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    validarCampos
],usuariosPost)

router.put('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(userExistID),
    // check('telefono', 'El telefono no es valido').isMobilePhone('es-MX'),
    validarCampos
],usuariosPut)

router.delete('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(userExistID),
    validarCampos
],usuariosDelete)




module.exports = router
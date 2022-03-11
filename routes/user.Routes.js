const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosGetAll, usuariosGetAllEliminados, generarQRuser } = require('../controllers/user.Controller')
const { emailExistUsuario, userExistID } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validarCampos')
const {  validarTokens } = require('../middlewares/validarTokens')
const {  esAdminRole,hasRole } = require('../middlewares/validarRoles');

const router = Router()

const {admin,master,aux} = {
    admin:"ADMIN_ROLE",
    master:"MASTER_ROLE",
    aux:"AUX_ROLE",
}


router.get('/', validarTokens,hasRole(admin,aux,master) ,usuariosGetAll)


router.get('/eliminados',validarTokens,hasRole(admin,master), usuariosGetAllEliminados)



//TEST QR
router.get('/qr/:id',validarTokens,hasRole(admin,master),generarQRuser)
//==================================

router.get('/:id', validarTokens,hasRole(admin,aux,master) ,usuariosGet)
//TODO:RFC al ultimo 
router.post('/',validarTokens,hasRole(admin,master),[
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExistUsuario ),
    check('telefono', 'El telefono no es valido').isMobilePhone('es-MX'),
    check('direccion', 'la direccion es obligatoria').not().isEmpty(),
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    validarCampos
],usuariosPost)

router.put('/:id',validarTokens,hasRole(admin,master),[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(userExistID),
    // check('telefono', 'El telefono no es valido').isMobilePhone('es-MX'),
    validarCampos
],usuariosPut)

router.delete('/:id',validarTokens,hasRole(admin,master),[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(userExistID),
    validarCampos
],usuariosDelete)




module.exports = router
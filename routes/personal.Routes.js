const { Router } = require('express')
const { check } = require('express-validator')

const { login } = require('../controllers/auth.Controller')
const { PersonalGet, PersonalPost, PersonalPut, PersonalDelete, PersonalGetAll, PersonalGetAllEliminados } = require('../controllers/personal.Controller')

const { emailExistPersonal, personalExistID } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()


router.get('/',PersonalGetAll)
router.get('/eliminados', PersonalGetAllEliminados)



router.get('/:id',PersonalGet)




router.post('/',[
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExistPersonal ),
    check('telefono', 'No es un telefono valido').isMobilePhone('es-MX'),
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y minimo 6 caracteres').isLength({min: 6}),
    check('rol', 'El rol es requerido').isMongoId(),
    validarCampos
],PersonalPost)

router.put('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(personalExistID),
    // check('telefono', 'No es un telefono valido').isMobilePhone('es-MX'),
    
    validarCampos
],PersonalPut)

router.delete('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(personalExistID),
    validarCampos
],PersonalDelete)

router.post("/login",login);


module.exports = router
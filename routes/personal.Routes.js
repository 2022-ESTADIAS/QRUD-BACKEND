const { Router } = require('express')
const { check } = require('express-validator')
const { PersonalGet, PersonalPost, PersonalPut, PersonalDelete, PersonalGetAll } = require('../controllers/personal.Controller')
const { emailExistPersonal, personalExistID } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()

router.get('/:id',PersonalGet)

router.get('/',PersonalGetAll)



router.post('/',[
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExistPersonal ),
    check('telefono', 'No es un telefono valido').isMobilePhone('es-MX'),
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y minimo 6 caracteres').isLength({min: 6}),
    validarCampos
],PersonalPost)

router.put('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(personalExistID),
    validarCampos
],PersonalPut)

router.delete('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check("id").custom(personalExistID),
    validarCampos
],PersonalDelete)



module.exports = router
const { Router } = require('express')
const { check } = require('express-validator')
const { PersonalGet, PersonalPost, PersonalPut, PersonalDelete } = require('../controllers/personal.Controller')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()


router.get('/',PersonalGet)
router.post('/',[
    check('email', 'El correo no es válido').isEmail(),
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y minimo 6 caracteres').isLength({min: 6}),
    validarCampos
],PersonalPost)
router.put('/:id',PersonalPut)
router.delete('/:id',PersonalDelete)



module.exports = router
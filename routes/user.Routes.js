const { Router } = require('express')
const { UsuariosGet, UsuariosPost, UsuariosPut } = require('../controllers/user.Controller')

const router = Router()


router.get('/',UsuariosGet)
router.post('/',UsuariosPost)
router.put('/:id',UsuariosPut)




module.exports = router
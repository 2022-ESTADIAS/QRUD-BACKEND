const { Router } = require('express')
const { PersonalGet, PersonalPost, PersonalPut } = require('../controllers/personal.Controller')
const router = Router()


router.get('/',PersonalGet)
router.post('/',PersonalPost)
router.put('/:id',PersonalPut)



module.exports = router
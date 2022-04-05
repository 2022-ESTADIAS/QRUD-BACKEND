const { Router } = require("express");
const { check } = require("express-validator");
const { registroPublico, activarUsuarioEmail } = require("../controllers/public.Controller");

const router = Router();
//FALTAN VALIDACIONES
router.post("/registro", registroPublico)

router.get("/email-active/:id", activarUsuarioEmail)


module.exports = router;

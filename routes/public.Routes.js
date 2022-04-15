const { Router } = require("express");
const { check } = require("express-validator");
const { registroPublico, activarUsuarioEmail } = require("../controllers/public.Controller");
const { emailExistUsuario, rfcUsuario } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();
//FALTAN VALIDACIONES
router.post("/registro",
[
    check("rfc", "El RFC es obligatorio").custom(rfcUsuario),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExistUsuario),
    check("telefono", "El telefono no es valido").isMobilePhone("es-MX"),
    check("direccion", "la direccion es obligatoria").not().isEmpty(),
    check("nombre", "El Nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
 registroPublico)

router.get("/email-active/:id", activarUsuarioEmail)


module.exports = router;

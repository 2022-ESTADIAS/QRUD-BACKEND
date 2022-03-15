const { Router } = require("express");
const { check } = require("express-validator");

const {
  PersonalGet,
  PersonalPost,
  PersonalPut,
  PersonalDelete,
  PersonalGetAll,
  PersonalGetAllEliminados,
} = require("../controllers/personal.Controller");
const { changePwd, forgotPwd, forgotPwd2 } = require("../controllers/pwd.Controller");

const {
  emailExistPersonal,
  personalExistID,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validarCampos");
const { hasRole } = require("../middlewares/validarRoles");
const { validarTokens } = require("../middlewares/validarTokens");
const router = Router();

const { admin, master, aux } = {
  admin: "ADMIN_ROLE",
  master: "MASTER_ROLE",
  aux: "AUX_ROLE",
};

router.put(
  "/email-pwd",
  forgotPwd2
)



//FORGOT PWD VIA EMAIL
//http://localhost:3000/forgot-pwd?token=${resetToken}&id=${user.id}
router.put(
  "/forgot-pwd",
  [
    check("email", "El correo no es valido").isEmail(),
    validarCampos,

  ],forgotPwd
)




//CHANGE PWD
router.put(
  "/changepwd",
  validarTokens,
  hasRole(admin,master,aux),
  changePwd
)



router.get("/", 
validarTokens, 
hasRole(admin, master), 
PersonalGetAll);

router.get(
  "/eliminados",
  validarTokens,
  hasRole(admin, master),
  PersonalGetAllEliminados
);

router.get(
  "/:id",
  validarTokens,
  hasRole(admin, master),
  [check("id").custom(personalExistID)],
  PersonalGet
);

router.post(
  "/",
  validarTokens,
  hasRole(master),
  [
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExistPersonal),
    check("telefono", "No es un telefono valido").isMobilePhone("es-MX"),
    check("nombre", "El Nombre es obligatorio").not().isEmpty(),
    check("password","El password es obligatorio y minimo 6 caracteres").isLength({ min: 6 }),
    check("rol", "El rol es requerido").isMongoId(),
    validarCampos,
  ],
  PersonalPost
);

router.put(
  "/:id",
  validarTokens,
  hasRole(master),
  [
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(personalExistID),
    validarCampos,
  ],
  PersonalPut
);

router.delete(
  "/:id",
  validarTokens,
  hasRole(master),
  [
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(personalExistID),
    validarCampos,
  ],
  PersonalDelete
);









module.exports = router;

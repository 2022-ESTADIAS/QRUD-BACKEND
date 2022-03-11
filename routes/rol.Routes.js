const { Router } = require("express");
const { check } = require("express-validator");
const {
  RolGet,
  RolPost,
  RolPut,
  RolGetAll,
} = require("../controllers/rol.Controller");
const { rolExistID } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validarCampos");
const { hasRole } = require("../middlewares/validarRoles");
const { validarTokens } = require("../middlewares/validarTokens");
const router = Router();

const { admin, master, aux } = {
  admin: "ADMIN_ROLE",
  master: "MASTER_ROLE",
  aux: "AUX_ROLE",
};

router.get("/", 
validarTokens, 
hasRole(master), 
RolGetAll);

router.get(
  "/:id",
  validarTokens,
  hasRole(master),
  [
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(rolExistID),
    validarCampos,
  ],
  RolGet
);

router.post(
  "/",
  validarTokens,
  hasRole(master),
  [
    check("rol", "El nombre del rol es obligatorio").not().isEmpty(),
    check("description", "La descripcion es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  RolPost
);
router.put(
  "/:id",
  validarTokens,
  hasRole(master),
  [
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(rolExistID),
    validarCampos,
  ],
  RolPut
);

module.exports = router;

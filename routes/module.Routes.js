const { Router } = require("express");
const { validarTokens } = require("../middlewares/validarTokens");
const {
  createModule,
  getModulesByRol,
} = require("../controllers/module.Controller");
const { hasRole } = require("../middlewares/validarRoles");
const router = Router();

const { admin, master, aux, client } = {
  admin: "ADMIN_ROLE",
  master: "MASTER_ROLE",
  aux: "AUX_ROLE",
  client: "CLIENT_ROLE",
};

router.post("/", validarTokens, hasRole(master), createModule);
router.get("/", validarTokens, getModulesByRol);

module.exports = router;

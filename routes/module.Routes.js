const { Router } = require("express");
const { validarTokens } = require("../middlewares/validarTokens");
const {
  createModule,
  getModulesByRol,
} = require("../controllers/module.Controller");
const router = Router();

router.post("/", createModule);
router.get("/", validarTokens, getModulesByRol);

module.exports = router;

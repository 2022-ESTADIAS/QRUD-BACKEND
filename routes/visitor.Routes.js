const { Router } = require("express");
const { validarTokens } = require("../middlewares/validarTokens");
const {
  getAllVisitors,
  getAllDrivers,
  getAllDriversByClientId,
} = require("../controllers/visitor.Controlller");
const router = Router();

router.get("/", validarTokens, getAllVisitors);
router.get("/drivers", validarTokens, getAllDrivers);
router.get("/trucks", validarTokens, getAllDriversByClientId);

module.exports = router;

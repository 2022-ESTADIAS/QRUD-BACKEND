const { Router } = require("express");
const { validarTokens } = require("../middlewares/validarTokens");
const {
  getAllVisitors,
  getAllDrivers,
} = require("../controllers/visitor.Controlller");
const router = Router();

router.get("/", validarTokens, getAllVisitors);
router.get("/drivers", validarTokens, getAllDrivers);

module.exports = router;

const { Router } = require("express");
const { validarTokens } = require("../middlewares/validarTokens");
const { getAllVisitors } = require("../controllers/visitor.Controlller");
const router = Router();

router.get("/", validarTokens, getAllVisitors);

module.exports = router;

const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.Controller");
const router = Router();



router.post("/login", login);




module.exports = router;

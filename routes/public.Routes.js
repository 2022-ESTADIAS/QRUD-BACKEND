const { Router } = require("express");
const { check } = require("express-validator");

const {
  registroPublico,
  activarUsuarioEmail,
  getAllDepartments,
  getAllVisitorsTypes,
  visitorsEntries,
  verifyActiveVisitor,
  getAllDevices,
  getAllReasons,
} = require("../controllers/public.Controller");
const {
  emailExistUsuario,
  rfcUsuario,
  emailExistVisitor,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validarCampos");
const upload = require("../helpers/uploadFiles");

const router = Router();

router.post(
  "/registro",
  [
    // check("email", "El correo no es válido").isEmail(),
    // check("email").custom(emailExistVisitor),
    // check("name", "El Nombre es obligatorio").not().isEmpty(),
    // check("visit_date", "la fecha de visita es obligatoria").not().isEmpty(),
    // check("department_id", "El departamento es obligatorio").not().isEmpty(),
    // check("enter_device", "El dispositivo es obligatorio").not().isEmpty(),
    // check("visitor_type_id", "El visitante es obligatorio").not().isEmpty(),
    // check("contact_name", "El contacto es obligatorio").not().isEmpty(),
    validarCampos,
  ],

  upload.single("ine_field"),
  registroPublico
);

router.post("/visitors-entries", visitorsEntries);
router.get("/departments", getAllDepartments);
router.get("/devices", getAllDevices);
router.get("/reasons", getAllReasons);
router.get("/visitors-types", getAllVisitorsTypes);
router.get("/visitors-active-verification/:id", verifyActiveVisitor);
router.get("/email-active/:id", activarUsuarioEmail);

module.exports = router;

const { Router } = require("express");
const { validarTokens } = require("../middlewares/validarTokens");
const {
  getAllVisitors,
  getAllDrivers,
  getAllDriversByClientId,
  getTrucksAssigned,
} = require("../controllers/visitor.Controlller");
const { hasRole } = require("../middlewares/validarRoles");
const router = Router();

const { admin, master, aux, client } = {
  admin: "ADMIN_ROLE",
  master: "MASTER_ROLE",
  aux: "AUX_ROLE",
  client: "CLIENT_ROLE",
};

router.get("/", validarTokens, hasRole(master), getAllVisitors);
router.get("/drivers", validarTokens, getAllDrivers);
router.get("/trucks", validarTokens, getAllDriversByClientId);
router.get(
  "/assigned-trucks/:id",
  validarTokens,
  hasRole(master),
  getTrucksAssigned
);

module.exports = router;

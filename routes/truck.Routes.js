const { Router } = require("express");
const { validarTokens } = require("../middlewares/validarTokens");

const { hasRole } = require("../middlewares/validarRoles");
const {
  createTruck,
  getAllTrucks,
  getOneTruck,
  updateTruck,
  deleteTruck,
  generateTruckQR,
  getTruckFromQR,
} = require("../controllers/truck.Controller");
const router = Router();

const { admin, master, aux, client } = {
  admin: "ADMIN_ROLE",
  master: "MASTER_ROLE",
  aux: "AUX_ROLE",
  client: "CLIENT_ROLE",
};
router.post("/", validarTokens, hasRole(master), createTruck);
router.get("/", validarTokens, hasRole(master), getAllTrucks);
router.get("/:id", validarTokens, hasRole(master), getOneTruck);
router.post("/qr/:id", validarTokens, hasRole(master), generateTruckQR);
router.get("/qr/:id", getTruckFromQR);
router.put("/:id", validarTokens, hasRole(master), updateTruck);
router.delete("/:id", validarTokens, hasRole(master), deleteTruck);

module.exports = router;

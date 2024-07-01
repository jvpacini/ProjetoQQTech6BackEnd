const express = require("express");
const {
  getPerfil,
  getPerfis,
  addPerfil,
  editPerfil,
  removePerfil,
  removePerfilWithAssociations,
  getProfileModules,
  addPerfilWithModules,
} = require("../controllers/PerfilController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/perfis/:id", getPerfil);
router.get("/perfis", getPerfis);
router.post("/perfis", addPerfil);
router.post("/perfis-with-modules", addPerfilWithModules);
router.put("/perfis/:id", editPerfil);
router.delete("/perfis/:id", removePerfil);
router.delete("/perfis/:id/associations", removePerfilWithAssociations);
router.get("/perfis/:id/modules", getProfileModules);

module.exports = router;

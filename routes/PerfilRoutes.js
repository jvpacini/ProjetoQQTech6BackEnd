const express = require("express");
const {
  getPerfil,
  getPerfis,
  addPerfil,
  editPerfil,
  removePerfil,
  getProfileModules,
} = require("../controllers/PerfilController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/perfis/:id", getPerfil);
router.get("/perfis", getPerfis);
router.post("/perfis", addPerfil);
router.put("/perfis/:id", editPerfil);
router.delete("/perfis/:id", removePerfil);
router.get("/perfis/:id/modules", getProfileModules);
//colocar rota put pra atualizar perfil e relacionamentos de uma só vez

module.exports = router;

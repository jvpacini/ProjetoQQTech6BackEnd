const express = require("express");
const {
  getPerfilModulos,
  getPerfilModulo,
  addPerfilModulo,
  editPerfilModulo,
  removePerfilModulo,
} = require("../controllers/PerfilModuloController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/perfil-modulos", getPerfilModulos);
router.get("/perfil-modulos/:id", getPerfilModulo);
router.post("/perfil-modulos", addPerfilModulo);
router.put("/perfil-modulos/:id", editPerfilModulo);
router.delete("/perfil-modulos/:id", removePerfilModulo);

module.exports = router;

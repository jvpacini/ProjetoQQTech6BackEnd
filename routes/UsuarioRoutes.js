const express = require("express");
const {
  getUsuario,
  getUsuarios,
  addUsuario,
  editUsuario,
  removeUsuario,
  getUserProfile,
} = require("../controllers/UsuarioController");

const router = express.Router();

router.get("/usuarios/:id", getUsuario);
router.get("/usuarios", getUsuarios);
router.post("/usuarios", addUsuario);
router.put("/usuarios/:id", editUsuario);
router.delete("/usuarios/:id", removeUsuario);
router.get('/usuarios/:id/profile', getUserProfile);

module.exports = router;

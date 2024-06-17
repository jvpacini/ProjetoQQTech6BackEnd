const express = require("express");
const {
  getUsuario,
  getUsuarios,
  addUsuario,
  editUsuario,
  removeUsuario,
} = require("../controllers/UsuarioController");

const router = express.Router();

router.get("/usuarios/:id", getUsuario);
router.get("/usuarios", getUsuarios);
router.post("/usuarios", addUsuario);
router.put("/usuarios/:id", editUsuario);
router.delete("/usuarios/:id", removeUsuario);

module.exports = router;

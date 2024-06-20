const express = require("express");
const {
  getModuloFuncoes,
  getModuloFuncao,
  addModuloFuncao,
  editModuloFuncao,
  removeModuloFuncao,
} = require("../controllers/ModuloFuncaoController");

const router = express.Router();

router.get("/modulo-funcoes", getModuloFuncoes);
router.get("/modulo-funcoes/:id", getModuloFuncao);
router.post("/modulo-funcoes", addModuloFuncao);
router.put("/modulo-funcoes/:id", editModuloFuncao);
router.delete("/modulo-funcoes/:id", removeModuloFuncao);

module.exports = router;

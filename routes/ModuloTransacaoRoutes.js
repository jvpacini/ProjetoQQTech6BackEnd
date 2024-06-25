const express = require("express");
const {
  getModuloTransacoes,
  getModuloTransacao,
  addModuloTransacao,
  editModuloTransacao,
  removeModuloTransacao,
} = require("../controllers/ModuloTransacaoController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/modulo-transacoes", getModuloTransacoes);
router.get("/modulo-transacoes/:id", getModuloTransacao);
router.post("/modulo-transacoes", addModuloTransacao);
router.put("/modulo-transacoes/:id", editModuloTransacao);
router.delete("/modulo-transacoes/:id", removeModuloTransacao);

module.exports = router;

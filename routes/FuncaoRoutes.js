const express = require("express");
const {
  getFuncao,
  getFuncoes,
  addFuncao,
  editFuncao,
  removeFuncao,
} = require("../controllers/FuncaoController");

const router = express.Router();

router.get("/funcoes/:id", getFuncao);
router.get("/funcoes", getFuncoes);
router.post("/funcoes", addFuncao);
router.put("/funcoes/:id", editFuncao);
router.delete("/funcoes/:id", removeFuncao);

module.exports = router;

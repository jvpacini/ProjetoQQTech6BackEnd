const express = require("express");
const {
  getFuncao,
  addFuncao,
  editFuncao,
  removeFuncao,
} = require("../controllers/FuncaoController");

const router = express.Router();

router.get("/funcoes/:id", getFuncao);
router.post("/funcoes", addFuncao);
router.put("/funcoes/:id", editFuncao);
router.delete("/funcoes/:id", removeFuncao);

module.exports = router;

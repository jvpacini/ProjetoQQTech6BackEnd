const express = require("express");
const {
  getFuncao,
  getFuncoes,
  addFuncao,
  editFuncao,
  removeFuncao,
} = require("../controllers/FuncaoController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/funcoes/:id", auth, getFuncao);
router.get("/funcoes", auth, getFuncoes);
router.post("/funcoes", auth, addFuncao);
router.put("/funcoes/:id", auth, editFuncao);
router.delete("/funcoes/:id", auth, removeFuncao);

module.exports = router;

const express = require("express");
const {
  getModulo,
  addModulo,
  editModulo,
  removeModulo,
} = require("../controllers/ModuloController");

const router = express.Router();

router.get("/modulos/:id", getModulo);
router.post("/modulos", addModulo);
router.put("/modulos/:id", editModulo);
router.delete("/modulos/:id", removeModulo);

module.exports = router;

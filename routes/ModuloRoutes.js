const express = require("express");
const {
  getModulo,
  getModulos,
  addModulo,
  editModulo,
  removeModulo,
  getModuleDetails,
} = require("../controllers/ModuloController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/modulos/:id", getModulo);
router.get("/modulos", getModulos);
router.post("/modulos", addModulo);
router.put("/modulos/:id", editModulo);
router.delete("/modulos/:id", removeModulo);
router.get("/modulos/:id/details", getModuleDetails);

module.exports = router;

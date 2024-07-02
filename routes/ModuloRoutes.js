const express = require("express");
const {
  getModulos,
  getModulo,
  addModulo,
  editModulo,
  removeModulo,
  getAllModulesWithDetails,
} = require("../controllers/ModuloController");

const router = express.Router();

router.get("/modulos", getModulos);
router.get("/modulos/:id", getModulo);
router.post("/modulos", addModulo);
router.put("/modulos/:id", editModulo);
router.delete("/:id/associations", removeModulo);
router.get("/modulos-details", getAllModulesWithDetails);

module.exports = router;

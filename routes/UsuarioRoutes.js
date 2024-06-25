const express = require("express");
const { check } = require("express-validator");
const {
  getUsuario,
  getUsuarios,
  addUsuario,
  editUsuario,
  removeUsuario,
  getUserProfile,
  loginUser,
} = require("../controllers/UsuarioController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/usuarios/:id", auth, getUsuario);
router.get("/usuarios", auth, getUsuarios);
router.post(
  "/usuarios",
  [
    check("email", "Please include a valid email").isEmail(),
    check("senha", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  addUsuario
);
router.put("/usuarios/:id", auth, editUsuario);
router.delete("/usuarios/:id", auth, removeUsuario);
router.get("/usuarios/:id/profile", auth, getUserProfile);
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("senha", "Password is required").exists(),
  ],
  loginUser
);

module.exports = router;

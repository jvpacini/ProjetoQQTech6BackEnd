const express = require("express");
const { getUser } = require("../controllers/UsuarioController");

const router = express.Router();

router.get("/usuarios/:id", getUser);

module.exports = router;

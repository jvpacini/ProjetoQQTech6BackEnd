const {
  getUsuarioById,
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getUserWithProfile,
  getUserByEmail,
} = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const getUsuario = async (req, res) => {
  try {
    const usuario = await getUsuarioById(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUsuario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { codigo_usuario, nome_completo, email, senha } = req.body;

  try {
    const newUsuario = await createUsuario(
      codigo_usuario,
      nome_completo,
      email,
      senha
    );
    res.status(201).json(newUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editUsuario = async (req, res) => {
  try {
    const { codigo_usuario, nome_completo, email, senha } = req.body;
    const updatedUsuario = await updateUsuario(
      req.params.id,
      codigo_usuario,
      nome_completo,
      email,
      senha
    );
    res.status(200).json(updatedUsuario);
  } catch (error) {
    if (error.message === "Duplicate codigo_usuario") {
      res.status(400).json({ error: "Duplicate codigo_usuario" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const removeUsuario = async (req, res) => {
  try {
    await deleteUsuario(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userProfile = await getUserWithProfile(req.params.id);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const payload = {
      user: {
        id: user.id_usuario,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Ensure this is the correct secret
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsuario,
  getUsuarios,
  addUsuario,
  editUsuario,
  removeUsuario,
  getUserProfile,
  loginUser,
};

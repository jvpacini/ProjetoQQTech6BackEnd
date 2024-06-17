const {
  getUsuarioById,
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../models/Usuario");

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
  try {
    const { codigo_usuario, nome_completo, email, senha } = req.body;
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

module.exports = {
  getUsuario,
  getUsuarios,
  addUsuario,
  editUsuario,
  removeUsuario,
};

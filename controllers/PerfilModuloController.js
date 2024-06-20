const {
  getAllPerfilModulos,
  getPerfilModuloById,
  createPerfilModulo,
  updatePerfilModulo,
  deletePerfilModulo,
} = require("../models/PerfilModulo");

const getPerfilModulos = async (req, res) => {
  try {
    const perfilModulos = await getAllPerfilModulos();
    res.status(200).json(perfilModulos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPerfilModulo = async (req, res) => {
  try {
    const perfilModulo = await getPerfilModuloById(req.params.id);
    res.status(200).json(perfilModulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPerfilModulo = async (req, res) => {
  try {
    const { id_perfil, id_modulo } = req.body;
    const newPerfilModulo = await createPerfilModulo(id_perfil, id_modulo);
    if (!newPerfilModulo) {
      res.status(409).json({ error: "Association already exists" });
    } else {
      res.status(201).json(newPerfilModulo);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editPerfilModulo = async (req, res) => {
  try {
    const { id_perfil, id_modulo } = req.body;
    const updatedPerfilModulo = await updatePerfilModulo(
      req.params.id,
      id_perfil,
      id_modulo
    );
    res.status(200).json(updatedPerfilModulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removePerfilModulo = async (req, res) => {
  try {
    await deletePerfilModulo(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPerfilModulos,
  getPerfilModulo,
  addPerfilModulo,
  editPerfilModulo,
  removePerfilModulo,
};

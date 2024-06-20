const {
  getModuloById,
  getAllModulos,
  createModulo,
  updateModulo,
  deleteModulo,
  getModuleWithDetails,
} = require("../models/Modulo");

const getModulo = async (req, res) => {
  try {
    const modulo = await getModuloById(req.params.id);
    res.status(200).json(modulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getModulos = async (req, res) => {
  try {
    const modulos = await getAllModulos();
    res.status(200).json(modulos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addModulo = async (req, res) => {
  try {
    const { codigo_modulo, nome_modulo, descricao } = req.body;
    const newModulo = await createModulo(codigo_modulo, nome_modulo, descricao);
    res.status(201).json(newModulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editModulo = async (req, res) => {
  try {
    const { codigo_modulo, nome_modulo, descricao } = req.body;
    const updatedModulo = await updateModulo(
      req.params.id,
      codigo_modulo,
      nome_modulo,
      descricao
    );
    res.status(200).json(updatedModulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeModulo = async (req, res) => {
  try {
    await deleteModulo(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getModuleDetails = async (req, res) => {
  try {
    const moduleDetails = await getModuleWithDetails(req.params.id);
    res.status(200).json(moduleDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getModulo,
  getModulos,
  addModulo,
  editModulo,
  removeModulo,
  getModuleDetails,
};

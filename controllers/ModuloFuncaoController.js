const {
  getAllModuloFuncoes,
  getModuloFuncaoById,
  createModuloFuncao,
  updateModuloFuncao,
  deleteModuloFuncao,
} = require("../models/ModuloFuncao");

const getModuloFuncoes = async (req, res) => {
  try {
    const moduloFuncoes = await getAllModuloFuncoes();
    res.status(200).json(moduloFuncoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getModuloFuncao = async (req, res) => {
  try {
    const moduloFuncao = await getModuloFuncaoById(req.params.id);
    res.status(200).json(moduloFuncao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addModuloFuncao = async (req, res) => {
  try {
    const { id_modulo, id_funcao } = req.body;
    const newModuloFuncao = await createModuloFuncao(id_modulo, id_funcao);
    if (!newModuloFuncao) {
      res.status(409).json({ error: "Association already exists" });
    } else {
      res.status(201).json(newModuloFuncao);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editModuloFuncao = async (req, res) => {
  try {
    const { id_modulo, id_funcao } = req.body;
    const updatedModuloFuncao = await updateModuloFuncao(
      req.params.id,
      id_modulo,
      id_funcao
    );
    res.status(200).json(updatedModuloFuncao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeModuloFuncao = async (req, res) => {
  try {
    await deleteModuloFuncao(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getModuloFuncoes,
  getModuloFuncao,
  addModuloFuncao,
  editModuloFuncao,
  removeModuloFuncao,
};

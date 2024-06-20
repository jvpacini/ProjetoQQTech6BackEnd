const {
  getAllModuloTransacoes,
  getModuloTransacaoById,
  createModuloTransacao,
  updateModuloTransacao,
  deleteModuloTransacao,
} = require("../models/ModuloTransacao");

const getModuloTransacoes = async (req, res) => {
  try {
    const moduloTransacoes = await getAllModuloTransacoes();
    res.status(200).json(moduloTransacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getModuloTransacao = async (req, res) => {
  try {
    const moduloTransacao = await getModuloTransacaoById(req.params.id);
    res.status(200).json(moduloTransacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addModuloTransacao = async (req, res) => {
  try {
    const { id_modulo, id_transacao } = req.body;
    const newModuloTransacao = await createModuloTransacao(
      id_modulo,
      id_transacao
    );
    if (!newModuloTransacao) {
      res.status(409).json({ error: "Association already exists" });
    } else {
      res.status(201).json(newModuloTransacao);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editModuloTransacao = async (req, res) => {
  try {
    const { id_modulo, id_transacao } = req.body;
    const updatedModuloTransacao = await updateModuloTransacao(
      req.params.id,
      id_modulo,
      id_transacao
    );
    res.status(200).json(updatedModuloTransacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeModuloTransacao = async (req, res) => {
  try {
    await deleteModuloTransacao(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getModuloTransacoes,
  getModuloTransacao,
  addModuloTransacao,
  editModuloTransacao,
  removeModuloTransacao,
};

const {
  getTransacaoById,
  getAllTransacoes,
  createTransacao,
  updateTransacao,
  deleteTransacao,
} = require("../models/Transacao");

const getTransacao = async (req, res) => {
  try {
    const transacao = await getTransacaoById(req.params.id);
    res.status(200).json(transacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransacoes = async (req, res) => {
  try {
    const transacoes = await getAllTransacoes();
    res.status(200).json(transacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTransacao = async (req, res) => {
  try {
    const { codigo_transacao, nome_transacao, descricao } = req.body;
    const newTransacao = await createTransacao(
      codigo_transacao,
      nome_transacao,
      descricao
    );
    res.status(201).json(newTransacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editTransacao = async (req, res) => {
  try {
    const { codigo_transacao, nome_transacao, descricao } = req.body;
    const updatedTransacao = await updateTransacao(
      req.params.id,
      codigo_transacao,
      nome_transacao,
      descricao
    );
    res.status(200).json(updatedTransacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeTransacao = async (req, res) => {
  try {
    await deleteTransacao(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTransacao,
  getTransacoes,
  addTransacao,
  editTransacao,
  removeTransacao,
};

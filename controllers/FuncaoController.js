const { getFuncaoById, createFuncao, updateFuncao, deleteFuncao } = require('../models/Funcao');

const getFuncao = async (req, res) => {
    try {
        const funcao = await getFuncaoById(req.params.id);
        res.status(200).json(funcao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addFuncao = async (req, res) => {
    try {
        const { codigo_funcao, nome_funcao, descricao } = req.body;
        const newFuncao = await createFuncao(codigo_funcao, nome_funcao, descricao);
        res.status(201).json(newFuncao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editFuncao = async (req, res) => {
    try {
        const { codigo_funcao, nome_funcao, descricao } = req.body;
        const updatedFuncao = await updateFuncao(req.params.id, codigo_funcao, nome_funcao, descricao);
        res.status(200).json(updatedFuncao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFuncao = async (req, res) => {
    try {
        await deleteFuncao(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getFuncao, addFuncao, editFuncao, removeFuncao };

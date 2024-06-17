const { getPerfilById, createPerfil, updatePerfil, deletePerfil } = require('../models/Perfil');

const getPerfil = async (req, res) => {
    try {
        const perfil = await getPerfilById(req.params.id);
        res.status(200).json(perfil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addPerfil = async (req, res) => {
    try {
        const { nome_perfil, descricao, id_usuario } = req.body;
        const newPerfil = await createPerfil(nome_perfil, descricao, id_usuario);
        res.status(201).json(newPerfil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editPerfil = async (req, res) => {
    try {
        const { nome_perfil, descricao, id_usuario } = req.body;
        const updatedPerfil = await updatePerfil(req.params.id, nome_perfil, descricao, id_usuario);
        res.status(200).json(updatedPerfil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removePerfil = async (req, res) => {
    try {
        await deletePerfil(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getPerfil, addPerfil, editPerfil, removePerfil };

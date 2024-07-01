const {
  getPerfilById,
  getAllPerfis,
  createPerfil,
  updatePerfil,
  deletePerfil,
  getProfileWithModules,
} = require("../models/Perfil");
const {
  deletePerfilModuloByPerfilId,
  createPerfilModulo,
} = require("../models/PerfilModulo");

const pool = require("../config/db");

const getPerfil = async (req, res) => {
  try {
    const perfil = await getPerfilById(req.params.id);
    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPerfis = async (req, res) => {
  try {
    const perfis = await getAllPerfis();
    res.status(200).json(perfis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPerfil = async (req, res) => {
  try {
    const { nome_perfil, descricao } = req.body;
    const newPerfil = await createPerfil(nome_perfil, descricao);
    res.status(201).json(newPerfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editPerfil = async (req, res) => {
  try {
    const { nome_perfil, descricao } = req.body;
    const updatedPerfil = await updatePerfil(
      req.params.id,
      nome_perfil,
      descricao
    );
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

const removePerfilWithAssociations = async (req, res) => {
  try {
    const perfilId = req.params.id;
    await deletePerfilModuloByPerfilId(perfilId);
    await deletePerfil(perfilId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfileModules = async (req, res) => {
  try {
    const profileModules = await getProfileWithModules(req.params.id);
    res.status(200).json(profileModules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPerfilWithModules = async (req, res) => {
  const client = await pool.connect();
  try {
    const { nome_perfil, descricao, moduloIds } = req.body;
    await client.query("BEGIN");
    const newPerfil = await createPerfil(nome_perfil, descricao, client);
    for (const moduloId of moduloIds) {
      await createPerfilModulo(newPerfil.id_perfil, moduloId, client);
    }
    await client.query("COMMIT");
    res.status(201).json(newPerfil);
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

module.exports = {
  getPerfil,
  getPerfis,
  addPerfil,
  editPerfil,
  removePerfil,
  removePerfilWithAssociations,
  getProfileModules,
  addPerfilWithModules,
};

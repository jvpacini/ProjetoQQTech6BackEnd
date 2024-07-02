const {
  getAllModulos,
  getModuloById,
  createModulo,
  updateModulo,
  deleteModulo,
  getModulesWithDetails
} = require("../models/Modulo");
const {
  createModuloFuncao,
  deleteModuloFuncaoByModuloId,
} = require("../models/ModuloFuncao");
const {
  createModuloTransacao,
  deleteModuloTransacaoByModuloId,
} = require("../models/ModuloTransacao");

const getModulos = async (req, res) => {
  try {
    const modulos = await getAllModulos();
    res.status(200).json(modulos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getModulo = async (req, res) => {
  try {
    const modulo = await getModuloById(req.params.id);
    res.status(200).json(modulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addModulo = async (req, res) => {
  try {
    const { codigo_modulo, nome_modulo, descricao, funcaoIds, transacaoIds } =
      req.body;
    const newModulo = await createModulo(codigo_modulo, nome_modulo, descricao);

    if (funcaoIds && funcaoIds.length > 0) {
      await Promise.all(
        funcaoIds.map((id_funcao) =>
          createModuloFuncao(newModulo.id_modulo, id_funcao)
        )
      );
    }

    if (transacaoIds && transacaoIds.length > 0) {
      await Promise.all(
        transacaoIds.map((id_transacao) =>
          createModuloTransacao(newModulo.id_modulo, id_transacao)
        )
      );
    }

    res.status(201).json(newModulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editModulo = async (req, res) => {
  try {
    const { codigo_modulo, nome_modulo, descricao, funcaoIds, transacaoIds } =
      req.body;
    const updatedModulo = await updateModulo(
      req.params.id,
      codigo_modulo,
      nome_modulo,
      descricao
    );

    await deleteModuloFuncaoByModuloId(req.params.id);
    await deleteModuloTransacaoByModuloId(req.params.id);

    if (funcaoIds && funcaoIds.length > 0) {
      await Promise.all(
        funcaoIds.map((id_funcao) =>
          createModuloFuncao(req.params.id, id_funcao)
        )
      );
    }

    if (transacaoIds && transacaoIds.length > 0) {
      await Promise.all(
        transacaoIds.map((id_transacao) =>
          createModuloTransacao(req.params.id, id_transacao)
        )
      );
    }

    res.status(200).json(updatedModulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeModulo = async (req, res) => {
  try {
    await deleteModuloFuncaoByModuloId(req.params.id);
    await deleteModuloTransacaoByModuloId(req.params.id);
    await deleteModulo(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllModulesWithDetails = async (req, res) => {
  try {
    const modulesWithDetails = await getModulesWithDetails();
    res.status(200).json(modulesWithDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getModulos,
  getModulo,
  addModulo,
  editModulo,
  removeModulo,
  getAllModulesWithDetails,
};

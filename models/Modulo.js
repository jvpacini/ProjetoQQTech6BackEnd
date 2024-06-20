const pool = require("../config/db");

const createModuloTable = `
    CREATE TABLE IF NOT EXISTS Modulo (
        id_modulo SERIAL PRIMARY KEY,
        codigo_modulo VARCHAR(20) UNIQUE,
        nome_modulo VARCHAR(50) UNIQUE,
        descricao VARCHAR(255)
    );
`;

pool.query(createModuloTable, (err, res) => {
  if (err) throw err;
  console.log("Modulo table is successfully created");
});

const getModuloById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM Modulo WHERE id_modulo = $1",
    [id]
  );
  return rows[0];
};

const getAllModulos = async () => {
  const { rows } = await pool.query("SELECT * FROM Modulo");
  return rows;
};

const createModulo = async (codigo_modulo, nome_modulo, descricao) => {
  const { rows } = await pool.query(
    "INSERT INTO Modulo (codigo_modulo, nome_modulo, descricao) VALUES ($1, $2, $3) RETURNING *",
    [codigo_modulo, nome_modulo, descricao]
  );
  return rows[0];
};

const updateModulo = async (id, codigo_modulo, nome_modulo, descricao) => {
  const { rows } = await pool.query(
    "UPDATE Modulo SET codigo_modulo = $1, nome_modulo = $2, descricao = $3 WHERE id_modulo = $4 RETURNING *",
    [codigo_modulo, nome_modulo, descricao, id]
  );
  return rows[0];
};

const deleteModulo = async (id) => {
  await pool.query("DELETE FROM Modulo WHERE id_modulo = $1", [id]);
};

const getModuleWithDetails = async (id) => {
  const { rows: moduleRows } = await pool.query(
    `SELECT m.id_modulo, m.nome_modulo, m.descricao 
     FROM Modulo m 
     WHERE m.id_modulo = $1`,
    [id]
  );

  const { rows: funcaoRows } = await pool.query(
    `SELECT f.nome_funcao 
     FROM ModuloFuncao mf 
     JOIN Funcao f ON mf.id_funcao = f.id_funcao 
     WHERE mf.id_modulo = $1`,
    [id]
  );

  const { rows: transacaoRows } = await pool.query(
    `SELECT t.nome_transacao 
     FROM ModuloTransacao mt 
     JOIN Transacao t ON mt.id_transacao = t.id_transacao 
     WHERE mt.id_modulo = $1`,
    [id]
  );

  return {
    module: moduleRows[0],
    funcoes: funcaoRows,
    transacoes: transacaoRows,
  };
};

module.exports = {
  getModuloById,
  getAllModulos,
  createModulo,
  updateModulo,
  deleteModulo,
  getModuleWithDetails,
};

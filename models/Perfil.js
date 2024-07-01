const pool = require("../config/db");

const createPerfilTable = `
    CREATE TABLE IF NOT EXISTS Perfil (
        id_perfil SERIAL PRIMARY KEY,
        nome_perfil VARCHAR(50) UNIQUE,
        descricao VARCHAR(255)
    );
`;

pool.query(createPerfilTable, (err, res) => {
  if (err) throw err;
  console.log("Perfil table is successfully created");
});

const getPerfilById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM Perfil WHERE id_perfil = $1",
    [id]
  );
  return rows[0];
};

const getAllPerfis = async () => {
  const { rows } = await pool.query("SELECT * FROM Perfil");
  return rows;
};

const createPerfil = async (nome_perfil, descricao) => {
  const { rows } = await pool.query(
    "INSERT INTO Perfil (nome_perfil, descricao) VALUES ($1, $2) RETURNING *",
    [nome_perfil, descricao]
  );
  return rows[0];
};

const updatePerfil = async (id, nome_perfil, descricao) => {
  const { rows } = await pool.query(
    "UPDATE Perfil SET nome_perfil = $1, descricao = $2 WHERE id_perfil = $3 RETURNING *",
    [nome_perfil, descricao, id]
  );
  return rows[0];
};

const deletePerfil = async (id) => {
  await pool.query("DELETE FROM Perfil WHERE id_perfil = $1", [id]);
};

const getProfileWithModules = async (id) => {
  const { rows: profileRows } = await pool.query(
    `SELECT p.id_perfil, p.nome_perfil, p.descricao 
     FROM Perfil p 
     WHERE p.id_perfil = $1`,
    [id]
  );

  const { rows: moduleRows } = await pool.query(
    `SELECT m.id_modulo, m.nome_modulo, m.descricao, m.codigo_modulo, pm.id_perfil_modulo
     FROM PerfilModulo pm 
     JOIN Modulo m ON pm.id_modulo = m.id_modulo 
     WHERE pm.id_perfil = $1`,
    [id]
  );

  return {
    profile: profileRows[0],
    modules: moduleRows,
  };
};

module.exports = {
  getPerfilById,
  getAllPerfis,
  createPerfil,
  updatePerfil,
  deletePerfil,
  getProfileWithModules,
};

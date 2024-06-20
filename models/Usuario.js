const pool = require("../config/db");

const createUsuarioTable = `
    CREATE TABLE IF NOT EXISTS Usuario (
        id_usuario SERIAL PRIMARY KEY,
        codigo_usuario INTEGER UNIQUE,
        nome_completo VARCHAR(255),
        email VARCHAR(50) UNIQUE,
        senha VARCHAR(255)
    );
`;

pool.query(createUsuarioTable, (err, res) => {
  if (err) throw err;
  console.log("Usuario table is successfully created");
});

const getUsuarioById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM Usuario WHERE id_usuario = $1",
    [id]
  );
  return rows[0];
};

const getAllUsuarios = async () => {
  const { rows } = await pool.query("SELECT * FROM Usuario");
  return rows;
};

const createUsuario = async (codigo_usuario, nome_completo, email, senha) => {
  const { rows } = await pool.query(
    "INSERT INTO Usuario (codigo_usuario, nome_completo, email, senha) VALUES ($1, $2, $3, $4) RETURNING *",
    [codigo_usuario, nome_completo, email, senha]
  );
  return rows[0];
};

const updateUsuario = async (
  id,
  codigo_usuario,
  nome_completo,
  email,
  senha
) => {
  const checkQuery =
    "SELECT id_usuario FROM Usuario WHERE codigo_usuario = $1 AND id_usuario != $2";
  const { rowCount } = await pool.query(checkQuery, [codigo_usuario, id]);

  if (rowCount > 0) {
    throw new Error("Duplicate codigo_usuario");
  }

  const { rows } = await pool.query(
    "UPDATE Usuario SET codigo_usuario = $1, nome_completo = $2, email = $3, senha = $4 WHERE id_usuario = $5 RETURNING *",
    [codigo_usuario, nome_completo, email, senha, id]
  );
  return rows[0];
};

const deleteUsuario = async (id) => {
  await pool.query("DELETE FROM Usuario WHERE id_usuario = $1", [id]);
};

const getUserWithProfile = async (id) => {
  const { rows } = await pool.query(
    `SELECT u.id_usuario, u.nome_completo, u.email, p.nome_perfil 
     FROM Usuario u 
     LEFT JOIN Perfil p ON u.id_perfil = p.id_perfil 
     WHERE u.id_usuario = $1`,
    [id]
  );
  return rows[0];
};

module.exports = {
  getUsuarioById,
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getUserWithProfile,
};

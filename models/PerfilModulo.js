const pool = require("../config/db");

const createPerfilModuloTable = `
    CREATE TABLE IF NOT EXISTS PerfilModulo (
        id_perfil_modulo SERIAL PRIMARY KEY,
        id_perfil INTEGER,
        id_modulo INTEGER,
        FOREIGN KEY (id_perfil) REFERENCES Perfil(id_perfil),
        FOREIGN KEY (id_modulo) REFERENCES Modulo(id_modulo),
        UNIQUE (id_perfil, id_modulo)
    );
`;

pool.query(createPerfilModuloTable, (err, res) => {
  if (err) throw err;
  console.log("PerfilModulo table is successfully created");
});

const getAllPerfilModulos = async () => {
  const { rows } = await pool.query("SELECT * FROM PerfilModulo");
  return rows;
};

const getPerfilModuloById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM PerfilModulo WHERE id_perfil_modulo = $1",
    [id]
  );
  return rows[0];
};

const createPerfilModulo = async (id_perfil, id_modulo, client = pool) => {
  try {
    const { rows } = await client.query(
      "INSERT INTO PerfilModulo (id_perfil, id_modulo) VALUES ($1, $2) RETURNING *",
      [id_perfil, id_modulo]
    );
    return rows[0];
  } catch (err) {
    if (err.code === "23505") {
      // Duplicate key error
      return null;
    }
    throw err;
  }
};

const updatePerfilModulo = async (id, id_perfil, id_modulo) => {
  const { rows } = await pool.query(
    "UPDATE PerfilModulo SET id_perfil = $1, id_modulo = $2 WHERE id_perfil_modulo = $3 RETURNING *",
    [id_perfil, id_modulo, id]
  );
  return rows[0];
};

const deletePerfilModulo = async (id) => {
  await pool.query("DELETE FROM PerfilModulo WHERE id_perfil_modulo = $1", [
    id,
  ]);
};

const deletePerfilModuloByPerfilId = async (id_perfil) => {
  await pool.query("DELETE FROM PerfilModulo WHERE id_perfil = $1", [id_perfil]);
};

module.exports = {
  getAllPerfilModulos,
  getPerfilModuloById,
  createPerfilModulo,
  updatePerfilModulo,
  deletePerfilModulo,
  deletePerfilModuloByPerfilId,
};
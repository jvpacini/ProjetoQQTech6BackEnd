const pool = require("../config/db");

const createModuloFuncaoTable = `
    CREATE TABLE IF NOT EXISTS ModuloFuncao (
        id_modulo_funcao SERIAL PRIMARY KEY,
        id_modulo INTEGER,
        id_funcao INTEGER,
        FOREIGN KEY (id_modulo) REFERENCES Modulo(id_modulo),
        FOREIGN KEY (id_funcao) REFERENCES Funcao(id_funcao),
        UNIQUE (id_modulo, id_funcao)
    );
`;

pool.query(createModuloFuncaoTable, (err, res) => {
  if (err) throw err;
  console.log("ModuloFuncao table is successfully created");
});

const getAllModuloFuncoes = async () => {
  const { rows } = await pool.query("SELECT * FROM ModuloFuncao");
  return rows;
};

const getModuloFuncaoById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM ModuloFuncao WHERE id_modulo_funcao = $1",
    [id]
  );
  return rows[0];
};

const createModuloFuncao = async (id_modulo, id_funcao) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO ModuloFuncao (id_modulo, id_funcao) VALUES ($1, $2) RETURNING *",
      [id_modulo, id_funcao]
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

const updateModuloFuncao = async (id, id_modulo, id_funcao) => {
  const { rows } = await pool.query(
    "UPDATE ModuloFuncao SET id_modulo = $1, id_funcao = $2 WHERE id_modulo_funcao = $3 RETURNING *",
    [id_modulo, id_funcao, id]
  );
  return rows[0];
};

const deleteModuloFuncao = async (id) => {
  await pool.query("DELETE FROM ModuloFuncao WHERE id_modulo_funcao = $1", [
    id,
  ]);
};

module.exports = {
  getAllModuloFuncoes,
  getModuloFuncaoById,
  createModuloFuncao,
  updateModuloFuncao,
  deleteModuloFuncao,
};

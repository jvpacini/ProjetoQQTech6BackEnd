const pool = require("../config/db");

const createModuloTransacaoTable = `
    CREATE TABLE IF NOT EXISTS ModuloTransacao (
        id_modulo_transacao SERIAL PRIMARY KEY,
        id_modulo INTEGER,
        id_transacao INTEGER,
        FOREIGN KEY (id_modulo) REFERENCES Modulo(id_modulo),
        FOREIGN KEY (id_transacao) REFERENCES Transacao(id_transacao),
        UNIQUE (id_modulo, id_transacao)
    );
`;

pool.query(createModuloTransacaoTable, (err, res) => {
  if (err) throw err;
  console.log("ModuloTransacao table is successfully created");
});

const getAllModuloTransacoes = async () => {
  const { rows } = await pool.query("SELECT * FROM ModuloTransacao");
  return rows;
};

const getModuloTransacaoById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM ModuloTransacao WHERE id_modulo_transacao = $1",
    [id]
  );
  return rows[0];
};

const createModuloTransacao = async (id_modulo, id_transacao) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO ModuloTransacao (id_modulo, id_transacao) VALUES ($1, $2) RETURNING *",
      [id_modulo, id_transacao]
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

const updateModuloTransacao = async (id, id_modulo, id_transacao) => {
  const { rows } = await pool.query(
    "UPDATE ModuloTransacao SET id_modulo = $1, id_transacao = $2 WHERE id_modulo_transacao = $3 RETURNING *",
    [id_modulo, id_transacao, id]
  );
  return rows[0];
};

const deleteModuloTransacao = async (id) => {
  await pool.query(
    "DELETE FROM ModuloTransacao WHERE id_modulo_transacao = $1",
    [id]
  );
};

module.exports = {
  getAllModuloTransacoes,
  getModuloTransacaoById,
  createModuloTransacao,
  updateModuloTransacao,
  deleteModuloTransacao,
};

const pool = require("../config/db");

const createModuloTransacaoTable = `
    CREATE TABLE IF NOT EXISTS ModuloTransacao (
        id_modulo_transacao SERIAL PRIMARY KEY,
        id_modulo INTEGER REFERENCES Modulo(id_modulo),
        id_transacao INTEGER REFERENCES Transacao(id_transacao),
        UNIQUE (id_modulo, id_transacao)
    );
`;

pool.query(createModuloTransacaoTable, (err, res) => {
  if (err) throw err;
  console.log("ModuloTransacao table is successfully created");
});

const createModuloTransacao = async (id_modulo, id_transacao) => {
  const { rows } = await pool.query(
    "INSERT INTO ModuloTransacao (id_modulo, id_transacao) VALUES ($1, $2) RETURNING *",
    [id_modulo, id_transacao]
  );
  return rows[0];
};

const deleteModuloTransacaoByModuloId = async (id_modulo) => {
  await pool.query("DELETE FROM ModuloTransacao WHERE id_modulo = $1", [
    id_modulo,
  ]);
};

module.exports = {
  createModuloTransacao,
  deleteModuloTransacaoByModuloId,
};

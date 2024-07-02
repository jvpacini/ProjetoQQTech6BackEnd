const pool = require("../config/db");

const createModuloFuncaoTable = `
    CREATE TABLE IF NOT EXISTS ModuloFuncao (
        id_modulo_funcao SERIAL PRIMARY KEY,
        id_modulo INTEGER REFERENCES Modulo(id_modulo),
        id_funcao INTEGER REFERENCES Funcao(id_funcao),
        UNIQUE (id_modulo, id_funcao)
    );
`;

pool.query(createModuloFuncaoTable, (err, res) => {
  if (err) throw err;
  console.log("ModuloFuncao table is successfully created");
});

const createModuloFuncao = async (id_modulo, id_funcao) => {
  const { rows } = await pool.query(
    "INSERT INTO ModuloFuncao (id_modulo, id_funcao) VALUES ($1, $2) RETURNING *",
    [id_modulo, id_funcao]
  );
  return rows[0];
};

const deleteModuloFuncaoByModuloId = async (id_modulo) => {
  await pool.query("DELETE FROM ModuloFuncao WHERE id_modulo = $1", [
    id_modulo,
  ]);
};

module.exports = {
  createModuloFuncao,
  deleteModuloFuncaoByModuloId,
};

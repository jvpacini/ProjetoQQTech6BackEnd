const pool = require('../config/db');

const createFuncaoTable = `
    CREATE TABLE IF NOT EXISTS Funcao (
        id_funcao SERIAL PRIMARY KEY,
        codigo_funcao VARCHAR(20) UNIQUE,
        nome_funcao VARCHAR(50) UNIQUE,
        descricao VARCHAR(255)
    );
`;

pool.query(createFuncaoTable, (err, res) => {
    if (err) throw err;
    console.log('Funcao table is successfully created');
});

const getFuncaoById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM Funcao WHERE id_funcao = $1', [id]);
    return rows[0];
};

const createFuncao = async (codigo_funcao, nome_funcao, descricao) => {
    const { rows } = await pool.query(
        'INSERT INTO Funcao (codigo_funcao, nome_funcao, descricao) VALUES ($1, $2, $3) RETURNING *',
        [codigo_funcao, nome_funcao, descricao]
    );
    return rows[0];
};

const updateFuncao = async (id, codigo_funcao, nome_funcao, descricao) => {
    const { rows } = await pool.query(
        'UPDATE Funcao SET codigo_funcao = $1, nome_funcao = $2, descricao = $3 WHERE id_funcao = $4 RETURNING *',
        [codigo_funcao, nome_funcao, descricao, id]
    );
    return rows[0];
};

const deleteFuncao = async (id) => {
    await pool.query('DELETE FROM Funcao WHERE id_funcao = $1', [id]);
};

module.exports = { getFuncaoById, createFuncao, updateFuncao, deleteFuncao };

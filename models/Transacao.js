const pool = require('../config/db');

const createTransacaoTable = `
    CREATE TABLE IF NOT EXISTS Transacao (
        id_transacao SERIAL PRIMARY KEY,
        codigo_transacao VARCHAR(20) UNIQUE,
        nome_transacao VARCHAR(50) UNIQUE,
        descricao VARCHAR(255)
    );
`;

pool.query(createTransacaoTable, (err, res) => {
    if (err) throw err;
    console.log('Transacao table is successfully created');
});

const getTransacaoById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM Transacao WHERE id_transacao = $1', [id]);
    return rows[0];
};

const createTransacao = async (codigo_transacao, nome_transacao, descricao) => {
    const { rows } = await pool.query(
        'INSERT INTO Transacao (codigo_transacao, nome_transacao, descricao) VALUES ($1, $2, $3) RETURNING *',
        [codigo_transacao, nome_transacao, descricao]
    );
    return rows[0];
};

const updateTransacao = async (id, codigo_transacao, nome_transacao, descricao) => {
    const { rows } = await pool.query(
        'UPDATE Transacao SET codigo_transacao = $1, nome_transacao = $2, descricao = $3 WHERE id_transacao = $4 RETURNING *',
        [codigo_transacao, nome_transacao, descricao, id]
    );
    return rows[0];
};

const deleteTransacao = async (id) => {
    await pool.query('DELETE FROM Transacao WHERE id_transacao = $1', [id]);
};

module.exports = { getTransacaoById, createTransacao, updateTransacao, deleteTransacao };

const pool = require('../config/db');

const createUserTable = `
    CREATE TABLE IF NOT EXISTS Usuario (
        id_usuario SERIAL PRIMARY KEY,
        codigo_usuario INTEGER UNIQUE,
        nome_completo VARCHAR(255),
        email VARCHAR(50) UNIQUE,
        senha VARCHAR(255)
    );
`;

pool.query(createUserTable, (err, res) => {
    if (err) throw err;
    console.log('Table is successfully created');
});

const getUserById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM Usuario WHERE id_usuario = $1', [id]);
    return rows[0];
};

module.exports = { getUserById };

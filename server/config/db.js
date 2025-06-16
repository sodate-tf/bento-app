// backend/config/db.js
const { Pool } = require('pg');
require('dotenv').config(); // Garante que as variáveis de ambiente estão carregadas

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Teste de conexão opcional ao iniciar
pool.connect()
    .then(client => {
        console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso!');
        client.release(); // Libera o cliente
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        console.error('Verifique suas variáveis de ambiente no arquivo .env e se o PostgreSQL está rodando.');
    });

module.exports = pool; // Exporta o pool para ser usado em outros arquivos

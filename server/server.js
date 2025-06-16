// backend/server.js

const express = require('express');
const cors = require('cors');

// Importa o roteador centralizado
const apiRoutes = require('./routes/index'); // Importa o index.js das rotas

const app = express();

app.use(cors());
app.use(express.json());

// Agora, todas as suas rotas são montadas sob '/api/bentoapp'
// usando o roteador principal 'apiRoutes'
app.use('/api/bentoapp', apiRoutes);

// --- Rota de Teste (Opcional) ---
app.get('/', (req, res) => {
    res.send('Servidor de Acampamentos funcionando! Acesse /api/bentoapp para as APIs.');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Para testar as APIs: http://localhost:${PORT}/api/bentoapp/acampamentos`);
});

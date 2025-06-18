// backend/routes/index.js
const express = require('express');
const router = express.Router();

// Importa cada arquivo de rota específico
const acampamentoRoutes = require('./acampamentoRoutes');
const pessoaRoutes = require('./pessoaRoutes');

// Monta cada conjunto de rotas. Note que os prefixos aqui são relativos
// ao prefixo que será dado a este router principal no server.js
router.use('/acampamentos', acampamentoRoutes);
router.use('/pessoas', pessoaRoutes);

// Exporta o roteador principal que contém todos os outros
module.exports = router;
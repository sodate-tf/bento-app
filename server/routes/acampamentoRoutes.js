// backend/src/routes/acampamentoRoutes.js

// Importa o módulo Router do Express para criar um manipulador de rotas.
const express = require('express');
const router = express.Router();

// Importa os controladores para a lógica de negócio real.
// Assumimos que você terá um arquivo como 'acampamentoController.js'
// onde a lógica para obter, criar, atualizar e deletar acampamentos reside.
const acampamentoController = require('../controllers/acampamentoController');

// --- Definição das Rotas para Acampamentos ---

/**
 * @route GET /api/acampamentos
 * @description Obtém todos os acampamentos.
 * @access Public
 */
router.get('/', acampamentoController.getAcampamentos);

/**
 * @route GET /api/acampamentos/:id
 * @description Obtém um único acampamento pelo ID.
 * @access Public
 */
router.get('/:id', acampamentoController.getAcampamentoById);

/**
 * @route GET /api/acampamentos/getlink/:id
 * @description Obtém o slug do link do acampamento
 * @access Public
 */
router.get('/getlink/:id', acampamentoController.getLinkAcampamento);

/**
 * @route POST /api/acampamentos
 * @description Cria um novo acampamento.
 * @access Public (ou Private/Authenticated, dependendo da sua necessidade)
 */
router.post('/', acampamentoController.createAcampamento);

/**
 * @route PUT /api/acampamentos/:id
 * @description Atualiza um acampamento existente.
 * @access Public (ou Private/Authenticated)
 */
router.put('/:id', acampamentoController.updateAcampamento);

/**
 * @route DELETE /api/acampamentos/:id
 * @description Deleta um acampamento.
 * @access Public (ou Private/Authenticated)
 */
router.delete('/:id', acampamentoController.deleteAcampamento);

// Exporta o router para que ele possa ser usado na sua aplicação Express principal (por exemplo, server.js).
module.exports = router;

/*
  Nota: Você precisaria criar um arquivo de controlador correspondente,
  como 'backend/src/controllers/acampamentoController.js',
  que conteria as funções reais (getAllAcampamentos, getAcampamentoById, etc.)
  para interagir com o banco de dados.

  Exemplo de 'backend/src/controllers/acampamentoController.js':
  const getAllAcampamentos = (req, res) => {
    // Lógica para buscar todos os acampamentos no DB e enviar como resposta JSON
    res.status(200).json({ message: "Retorna todos os acampamentos" });
  };

  const createAcampamento = (req, res) => {
    // Lógica para adicionar um novo acampamento ao DB
    res.status(201).json({ message: "Acampamento criado", data: req.body });
  };

  module.exports = {
    getAllAcampamentos,
    getAcampamentoById,
    createAcampamento,
    updateAcampamento,
    deleteAcampamento
  };
*/

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const acampamentoController = require('../controllers/acampamentoController');

// Configuração Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const ext = path.extname(originalName);
        const baseName = path.basename(originalName, ext);
        const timestamp = Date.now();
        cb(null, `${baseName}-${timestamp}${ext}`);
    }
});
const upload = multer({ storage });


// 🟢 ROTAS DE AÇÕES ESPECIAIS:
router.get('/acoes/getacampasativos', acampamentoController.getAcampasAtivos);
router.get('/getlink/:id', acampamentoController.getLinkAcampamento);


// 🟢 ROTAS CRUD PADRÃO:
router.get('/', acampamentoController.getAcampamentos);
router.get('/:id', acampamentoController.getAcampamentoById);

router.post('/', upload.fields([
    { name: 'cronograma', maxCount: 1 },
    { name: 'arte_camiseta', maxCount: 1 },
    { name: 'cardapio', maxCount: 1 }
]), acampamentoController.createAcampamento);

router.put('/:id', upload.fields([
    { name: 'cronograma', maxCount: 1 },
    { name: 'arte_camiseta', maxCount: 1 },
    { name: 'cardapio', maxCount: 1 }
]), acampamentoController.updateAcampamento);

router.delete('/:id', acampamentoController.deleteAcampamento);

module.exports = router;

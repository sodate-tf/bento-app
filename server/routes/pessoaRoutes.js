const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const pessoaController = require('../controllers/pessoaControler');

// Configuração Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/fotoPerfil/');
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



// 🟢 ROTAS CRUD PADRÃO:
router.get('/', pessoaController.getPessoas);
router.get('/:id', pessoaController.getPessoaById);

router.post('/', upload.fields([
    { name: 'url_foto_perfil', maxCount: 1 }
]), pessoaController.createPessoa);

router.put('/:id', upload.fields([
    { name: 'url_foto_perfil', maxCount: 1 }
]), pessoaController.updatePessoa);

router.delete('/:id', pessoaController.deletePessoa);

module.exports = router;

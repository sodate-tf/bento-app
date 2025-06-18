// backend/controllers/acampamentoController.js
const pool = require('../config/db'); // Importa o pool de conexão do banco de dados

// Função para criar um novo acampamento (POST /api/acampamentos)
const createAcampamento = async (req, res) => {
    try {
         const {
            is_ativo,
            nome_acampa,
            slug,
            data_inicio,
            data_final,
            local,
            taxa_equipe,
            taxa_externa,
            taxa_campista,
            chave_pix,
            url_link_pagamento,
            musica_tema,
            leitura_tema,
            cronograma, // Aqui virá o nome do arquivo, se precisar salvar o nome
            arte_camiseta,
            cardapio
        } = req.body;

        // Se quiser acessar o conteúdo dos arquivos:
        const cronogramaFile = req.files['cronograma']?.[0];
        const arteCamisetaFile = req.files['arte_camiseta']?.[0];
        const cardapioFile = req.files['cardapio']?.[0];

        // Exemplo: salvar nome original
        console.log('Nome original do cronograma:', cronogramaFile?.originalname);

        // Depois faz o insert normalmente...
        const result = await pool.query(
            `INSERT INTO acampamento (nome_acampa, is_ativo, slug, data_inicio, data_final, local, taxa_equipe, taxa_externa, taxa_campista, chave_pix, url_link_pagamento, musica_tema, leitura_tema, cronograma, arte_camiseta, cardapio)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
            [
                nome_acampa,
                is_ativo || false,
                slug,
                data_inicio,
                data_final,
                local,
                taxa_equipe,
                taxa_externa,
                taxa_campista,
                chave_pix,
                url_link_pagamento,
                musica_tema,
                leitura_tema,
                cronogramaFile?.originalname || cronograma, // salva o nome ou o caminho antigo
                arteCamisetaFile?.originalname || arte_camiseta,
                cardapioFile?.originalname || cardapio
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao criar acampamento:', err.message);
        res.status(500).json({ error: 'Erro ao criar acampamento', details: err.message });
    }
};

// Função para obter todos os acampamentos (GET /api/acampamentos)
const getAcampamentos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM acampamento ORDER BY data_inicio DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao obter acampamento:', err.message);
        res.status(500).json({ error: 'Erro ao obter acampamento', details: err.message });
    }
};

// Função para obter um acampamento por ID (GET /api/acampamentos/:id)
const getAcampamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM acampamento WHERE uid = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Acampamento não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao obter acampamento por ID:', err.message);
        res.status(500).json({ error: 'Erro ao obter acampamento', details: err.message });
    }
};

// Função para atualizar um acampamento (PUT /api/acampamentos/:id)
const updateAcampamento = async (req, res) => {
    const { id } = req.params;
     const {
            is_ativo,
            nome_acampa,
            slug,
            data_inicio,
            data_final,
            local,
            taxa_equipe,
            taxa_externa,
            taxa_campista,
            chave_pix,
            url_link_pagamento,
            musica_tema,
            leitura_tema,
            cronograma, // Aqui virá o nome do arquivo, se precisar salvar o nome
            arte_camiseta,
            cardapio
        } = req.body;

        const isAtivo = is_ativo === 'true' || is_ativo === true ? true : false;
        const cronogramaFile = req.files['cronograma']?.[0];
        const arteCamisetaFile = req.files['arte_camiseta']?.[0];
        const cardapioFile = req.files['cardapio']?.[0];

    try {
        const result = await pool.query(
            `UPDATE acampamento
             SET is_ativo = $1, nome_acampa = $2, slug = $3, data_inicio = $4,
                 data_final = $5, local = $6, taxa_equipe = $7, taxa_externa = $8,
                 taxa_campista = $9, chave_pix = $10, url_link_pagamento = $11,
                 musica_tema = $12, leitura_tema = $13, cronograma = $14, arte_camiseta = $15, cardapio = $16
             WHERE uid = $17 RETURNING *`,
            [isAtivo || false, nome_acampa, slug, data_inicio, data_final, local, 
              taxa_equipe, taxa_externa, taxa_campista, chave_pix, url_link_pagamento, musica_tema,
              leitura_tema, 
              cronogramaFile?.originalname || cronograma,
              arteCamisetaFile?.originalname || arte_camiseta,
              cardapioFile?.originalname || cardapio, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Acampamento não encontrado para atualização' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao atualizar acampamento:', err.message);
        res.status(500).json({ error: 'Erro ao atualizar acampamento', details: err.message });
    }
};

//Função para retornar o link de inscrição do acampamento (GET LINK /api/acampamentos/acao/getselectativo)
const getLinkAcampamento = async (req, res) => {
    const {id} = req.params;
    try{
        const result = await pool.query('SELECT slug FROM acampamento WHERE uid = $1', [id])
        if (result.rows.length === 0){
            return res.status(204).json({error: 'Link do acampamento não encontrado', details: err.message})
        }
        res.status(200).json(result.rows[0])
    }
    catch (err) {
        console.error('Erro ao obter acampamento SLUG do Acampamento:', err.message);
        res.status(500).json({ error: 'Erro ao obter acampamento', details: err.message });
    }
};

const getAcampasAtivos = async (req, res) =>{
    try {
        const result = await pool.query("SELECT uid, nome_acampa FROM ACAMPAMENTO WHERE is_ativo = true")
        res.status(200).json(result.rows)
    } catch (error) {
         console.error('Erro ao obter acampamento ATIVOS:', error.message);
         res.status(500).json({ error: 'Erro ao obter acampamento', details: error.message });
    }
};


// Função para deletar um acampamento (DELETE /api/acampamentos/:id)
const deleteAcampamento = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM acampamento WHERE uid = $1 RETURNING uid', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Acampamento não encontrado para exclusão' });
        }
        res.status(200).json({ message: 'Acampamento excluído com sucesso', deletedId: result.rows[0].id });
    } catch (err) {
        console.error('Erro ao deletar acampamento:', err.message);
        res.status(500).json({ error: 'Erro ao deletar acampamento', details: err.message });
    }
};

module.exports = {
    createAcampamento,
    getAcampamentos,
    getAcampamentoById,
    updateAcampamento,
    deleteAcampamento,
    getLinkAcampamento,
    getAcampasAtivos,
};

// backend/controllers/acampamentoController.js
const pool = require('../config/db'); // Importa o pool de conexão do banco de dados

// Função para criar um novo acampamento (POST /api/acampamentos)
const createAcampamento = async (req, res) => {
    const {  is_ativo, nome_acampa, slug, data_inicio, data_final, local, taxa_equipe, taxa_externa, taxa_campista, chave_pix, url_link_pagamento, musica_tema, leitura_tema, cronograma, arte_camiseta, cardapio } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO acampamento (nome_acampa, is_ativo, slug, data_inicio, data_final, local, taxa_equipe, taxa_externa, taxa_campista, chave_pix, url_link_pagamento, musica_tema, leitura_tema, cronograma, arte_camiseta, cardapio)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
            [is_ativo, nome_acampa, slug, data_inicio, data_final, local, taxa_equipe, taxa_externa, taxa_campista, chave_pix, url_link_pagamento, musica_tema, leitura_tema, cronograma, arte_camiseta, cardapio]
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
        const result = await pool.query('SELECT * FROM acampamento WHERE id = $1', [id]);
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
    const { nome, localizacao, data_inicio, data_fim, capacidade, preco_por_pessoa, descricao } = req.body;
    try {
        const result = await pool.query(
            `UPDATE acampamento
             SET nome = $1, localizacao = $2, data_inicio = $3, data_fim = $4,
                 capacidade = $5, preco_por_pessoa = $6, descricao = $7, updated_at = CURRENT_TIMESTAMP
             WHERE id = $8 RETURNING *`,
            [nome, localizacao, data_inicio, data_fim, capacidade, preco_por_pessoa, descricao, id]
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

//Função para retornar o link de inscrição do acampamento (GET LINK /api/acampamentos/getlink/:id)
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
        console.error('Erro ao obter acampamento por ID:', err.message);
        res.status(500).json({ error: 'Erro ao obter acampamento', details: err.message });
    }
}


// Função para deletar um acampamento (DELETE /api/acampamentos/:id)
const deleteAcampamento = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM acampamento WHERE id = $1 RETURNING id', [id]);
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
    getLinkAcampamento
};

// backend/controllers/pessoaController.js
const pool = require('../config/db'); // Importa o pool de conexão do banco de dados

// Função para criar um novo acampamento (POST /api/acampamentos)
const createPessoa = async (req, res) => {
    try {
         const {
            nome_completo, telefone, email, instagram, peso, altura, camiseta,
            profissao, data_nascimento, estado_civil, paroquia, batizado, eucaristia,
            crisma, matrimonio, contato_emergencia, telefone_emergencia, url_foto_perfil, alergia, qual_alergia,
            doenca_cronica, qual_doenca, tratamento_medico, qual_tratamento, medicamento_controlado,
            qual_medicamento, plano_de_saude, qual_plano, cep, rua, numero, complemento, bairro, cidade, estado,
            cpf
        } = req.body;

       


        // Depois faz o insert normalmente...
        const result = await pool.query(
    `INSERT INTO pessoa (
        nome_completo, telefone, email, instagram, peso, altura, camiseta,
        profissao, data_nascimento, estado_civil, paroquia, batizado, eucaristia,
        crisma, matrimonio, contato_emergencia, telefone_emergencia, url_foto_perfil,
        created_at, alergia, qual_alergia, doenca_cronica, qual_doenca, tratamento_medico,
        qual_tratamento, medicamento_controlado, qual_medicamento, plano_de_saude, qual_plano,
        cep, rua, numero, complemento, bairro, cidade, estado, cpf
    )
    VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13, $14,
        $15, $16, $17, $18,
        $19, $20, $21, $22, $23, $24,
        $25, $26, $27, $28, $29, $30, $31,
        $32, $33, $34, $35, $36, $37
    )
    RETURNING *;`,
    [
        nome_completo,
        telefone,
        email,
        instagram,
        peso,
        altura,
        camiseta,
        profissao,
        data_nascimento,
        estado_civil,
        paroquia,
        batizado,
        eucaristia,
        crisma,
        matrimonio,
        contato_emergencia,
        telefone_emergencia,
        url_foto_perfil,
        new Date().toLocaleDateString(),
        alergia,
        qual_alergia,
        doenca_cronica,
        qual_doenca,
        tratamento_medico,
        qual_tratamento,
        medicamento_controlado,
        qual_medicamento,
        plano_de_saude,
        qual_plano,
        cep,
        rua, 
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cpf
    ]
);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao criar pessoa:', err.message);
        res.status(500).json({ error: 'Erro ao criar pessoa', details: err.message });
    }
};

// Função para obter todos os pessoa (GET /api/pessoa)
const getPessoas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pessoa ORDER BY nome_completo');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter pessaos', details: err.message });
    }
};

// Função para obter um pessoa por ID (GET /api/pessoa/:id)
const getPessoaById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM pessoa WHERE uid = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Pessoa não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter pessoa', details: err.message });
    }
};

// Função para atualizar uma pessoa (PUT /api/pessoa/:id)
const updatePessoa = async (req, res) => {
    const { id } = req.params;
     const {
        nome_completo, telefone, email, instagram, peso, altura, camiseta, profissao,
        data_nascimento, estado_civil, paroquia, batizado, eucaristia, crisma, matrimonio,
        contato_emergencia, telefone_emergencia,url_foto_perfil ,alergia, qual_alergia, doenca_cronica, qual_doenca,
        tratamento_medico, qual_tratamento, medicamento_controlado, qual_medicamento, plano_de_saude, 
        qual_plano, cep, rua, numero, complemento, bairro, cidade, estado, cpf
        } = req.body;
 
        const updated_at = new Date()
    try {
        const result = await pool.query(
            `UPDATE pessoa
             SET nome_completo = $1, telefone = $2, email = $3, instagram = $4, peso = $5, altura = $6,
             camiseta = $7, profissao = $8, data_nascimento = $9, estado_civil = $10, paroquia = $11,
             batizado = $12, eucaristia = $13, crisma = $14, matrimonio = $15, contato_emergencia = $16,
             telefone_emergencia = $17, url_foto_perfil = $18, updated_at = CURRENT_TIMESTAMP, alergia = $19, qual_alergia = $20,
             doenca_cronica = $21, qual_doenca = $22, tratamento_medico = $23, qual_tratamento = $24,
             medicamento_controlado = $25, qual_medicamento = $26, plano_de_saude = $27, qual_plano = $28,
             cep = $29, rua = $30, numero = $31, complemento = $32, bairro = $33, cidade = $34, estado = $35, cpf = $36
             WHERE uid = $37 RETURNING *`,
            [nome_completo, telefone, email, instagram, peso, altura, camiseta, profissao, data_nascimento,
                estado_civil, paroquia, batizado, eucaristia, crisma, matrimonio, contato_emergencia, telefone_emergencia,
                url_foto_perfil , alergia, qual_alergia, doenca_cronica, qual_doenca, tratamento_medico,
                qual_tratamento, medicamento_controlado, qual_medicamento, plano_de_saude, qual_plano, cep,
                rua, numero, complemento, bairro, cidade, estado, cpf ,id
            ]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Pessoa não encontrado para atualização' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar pessoa', details: err.message });
    }
};

// Função para deletar um acampamento (DELETE /api/acampamentos/:id)
const deletePessoa = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM pessoa WHERE uid = $1 RETURNING uid', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Pessoa não encontrado para exclusão' });
        }
        res.status(200).json({ message: 'Pessoa excluído com sucesso', deletedId: result.rows[0].id });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar pessoa', details: err.message });
    }
};

module.exports = {
    createPessoa,
    getPessoas,
    getPessoaById,
    updatePessoa,
    deletePessoa
};
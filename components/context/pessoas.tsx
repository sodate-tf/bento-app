// --- Interfaces de Suporte ---

/**
 * Interface para os dados de endereço.
 */
export interface Endereco {
    cep?: string;
    rua?: string;
    numero?: string;
    complemento?: string; // Opcional, como na sua classe original
    bairro?: string;
    cidade?: string;
    estado?: string;
}

/**
 * Interface para os dados religiosos.
 */
export interface DadosReligiosos {
    paroquia?: string;
    batizado?: boolean;
    eucaristia?: boolean;
    crisma?: boolean;
    matrimonio?: boolean;
}

/**
 * Interface para os dados de saúde.
 */
export interface DadosSaude {
    peso?: number; // Assumindo que peso/altura seriam números
    altura?: number;
    alergia?: boolean;
    qualAlergia?: string;
    doencaCronica?: boolean;
    qualDoenca?: string;
    tratamentoMedico?: boolean;
    qualTratamento?: string;
    medicamentoControlado?: boolean;
    qualMedicamento?: string;
    planoDeSaude?: boolean;
    qualPlano?: string;
}

/**
 * Interface para os dados de contato de emergência.
 */
export interface ContatoEmergencia {
    nome?: string; // `contato_emergencia` no DB
    celular?: string; // `telefone_emergencia` no DB
}

/**
 * Interface que representa a estrutura completa dos dados de uma Pessoa
 * conforme seriam recebidos de/enviados para uma API ou DB.
 * Este é o "Data Transfer Object" (DTO).
 */
export interface PessoaApiData {
    uid?: string; // ID único, opcional ao criar, presente ao ler
    nome_completo: string;
    cpf: string; // Deixando como obrigatório aqui, conforme seu construtor anterior
    telefone: string; // Renomeado de 'celular' para 'telefone'
    email?: string; // Adicionado do DB
    instagram?: string;
    profissao?: string; // Adicionado do DB
    data_nascimento: string; // Preferencialmente string ISO para transporte
    estado_civil?: string;
    camiseta?: string; // `tamanho_camiseta` no DB -> `camiseta` aqui
    url_foto_perfil?: string; // `foto_perfil` no DB -> `url_foto_perfil` aqui
    created_at?: string; // Geralmente do DB, readonly

    // Agrupamentos de Endereço
    cep?: string;
    rua?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;

    // Agrupamentos de Dados Religiosos
    paroquia?: string;
    batizado?: boolean;
    eucaristia?: boolean;
    crisma?: boolean;
    matrimonio?: boolean;

    // Agrupamentos de Dados de Saúde
    peso?: number;
    altura?: number;
    alergia?: boolean;
    qual_alergia?: string;
    doenca_cronica?: boolean;
    qual_doenca?: string;
    tratamento_medico?: boolean;
    qual_tratamento?: string;
    medicamento_controlado?: boolean;
    qual_medicamento?: string;
    plano_de_saude?: boolean;
    qual_plano?: string;

    // Agrupamentos de Contato de Emergência
    contato_emergencia?: string; // Nome do contato
    telefone_emergencia?: string; // Telefone do contato
}



/**
 * Representa uma pessoa com informações pessoais, de contato, endereço, dados religiosos e de saúde.
 * Esta classe é o seu MODELO de domínio, mais focado em como os dados são usados na aplicação.
 */
export default class Pessoa {
    // Propriedades Públicas Readonly - Acessadas diretamente (ex: pessoa.nomeCompleto)
    readonly uid?: string;
    readonly nomeCompleto: string; // Corresponde a 'nome_completo'
    readonly cpf: string;
    readonly telefone: string; // Corresponde a 'telefone'
    readonly email: string;
    readonly instagram?: string;
    readonly profissao?: string;
    readonly dataNascimento: Date; // Armazenado como Date em memória
    readonly estadoCivil?: string;
    readonly tamanhoCamiseta?: string; // Corresponde a 'camiseta'
    readonly urlFotoPerfil?: string; // Corresponde a 'url_foto_perfil'
    readonly createdAt?: Date; // Se você quiser o created_at no modelo, converta para Date

    // Propriedades agrupadas
    readonly endereco: Endereco;
    readonly dadosReligiosos: DadosReligiosos;
    readonly dadosSaude: DadosSaude;
    readonly contatoEmergencia?: ContatoEmergencia; // Pode ser opcional se o nome/celular for opcional

    /**
     * Construtor da classe Pessoa.
     * @param props - Objeto contendo todos os dados necessários para criar uma Pessoa.
     */
    constructor(props: {
        uid?: string;
        nomeCompleto: string;
        cpf?: string;
        telefone: string;
        email?: string;
        dataNascimento: Date | string; // Aceita Date ou string ISO
        instagram?: string;
        profissao?: string;
        estadoCivil?: string;
        tamanhoCamiseta?: string;
        urlFotoPerfil?: string;
        createdAt?: Date | string; // Aceita Date ou string ISO

        // Campos de Endereço
        cep?: string;
        rua?: string;
        numero?: string;
        complemento?: string;
        bairro?: string;
        cidade?: string;
        estado?: string;

        // Campos de Dados Religiosos
        paroquia?: string;
        batizado?: boolean;
        eucaristia?: boolean;
        crisma?: boolean;
        matrimonio?: boolean;

        // Campos de Dados de Saúde
        peso?: number;
        altura?: number;
        alergia?: boolean;
        qualAlergia?: string;
        doencaCronica?: boolean;
        qualDoenca?: string;
        tratamentoMedico?: boolean;
        qualTratamento?: string;
        medicamentoControlado?: boolean;
        qualMedicamento?: string;
        planoDeSaude?: boolean;
        qualPlano?: string;

        // Campos de Contato de Emergência
        contatoEmergenciaNome?: string; // Renomeado para evitar conflito
        contatoEmergenciaCelular?: string; // Renomeado para evitar conflito
    }) {
        // Validações essenciais no construtor
        if (!props.nomeCompleto) throw new Error("O nome completo é obrigatório.");
        if (!props.telefone) throw new Error("O telefone é obrigatório.");
        if (!props.dataNascimento) throw new Error("A data de nascimento é obrigatória.");
        
        // Atribuição de propriedades principais
        this.uid = props.uid;
        this.nomeCompleto = props.nomeCompleto;
        this.cpf = props.cpf;
        this.telefone = props.telefone;
        this.email = props.email;
        this.instagram = props.instagram;
        this.profissao = props.profissao;
        this.estadoCivil = props.estadoCivil;
        this.tamanhoCamiseta = props.tamanhoCamiseta;
        this.urlFotoPerfil = props.urlFotoPerfil;

        // Conversão e validação de dataNascimento
        this.dataNascimento = typeof props.dataNascimento === 'string'
            ? new Date(props.dataNascimento)
            : props.dataNascimento;
        if (isNaN(this.dataNascimento.getTime())) {
            throw new Error("Formato inválido para data de nascimento.");
        }

        // Conversão e validação de createdAt (se presente)
        this.createdAt = props.createdAt
            ? (typeof props.createdAt === 'string' ? new Date(props.createdAt) : props.createdAt)
            : undefined;
        if (this.createdAt && isNaN(this.createdAt.getTime())) {
            throw new Error("Formato inválido para data de criação.");
        }

        // Agrupamento de Endereço
        this.endereco = {
            cep: props.cep,
            rua: props.rua,
            numero: props.numero,
            complemento: props.complemento,
            bairro: props.bairro,
            cidade: props.cidade,
            estado: props.estado,
        };

        // Agrupamento de Dados Religiosos
        this.dadosReligiosos = {
            paroquia: props.paroquia,
            batizado: props.batizado,
            eucaristia: props.eucaristia,
            crisma: props.crisma,
            matrimonio: props.matrimonio,
        };

        // Agrupamento de Dados de Saúde
        this.dadosSaude = {
            peso: props.peso,
            altura: props.altura,
            alergia: props.alergia,
            qualAlergia: props.qualAlergia,
            doencaCronica: props.doencaCronica,
            qualDoenca: props.qualDoenca,
            tratamentoMedico: props.tratamentoMedico,
            qualTratamento: props.qualTratamento,
            medicamentoControlado: props.medicamentoControlado,
            qualMedicamento: props.qualMedicamento,
            planoDeSaude: props.planoDeSaude,
            qualPlano: props.qualPlano,
        };

        // Agrupamento de Contato de Emergência (se ambos os campos existirem)
        if (props.contatoEmergenciaNome && props.contatoEmergenciaCelular) {
            this.contatoEmergencia = {
                nome: props.contatoEmergenciaNome,
                celular: props.contatoEmergenciaCelular,
            };
        }
    }

    /**
     * Cria uma nova instância de Pessoa a partir de um objeto de dados brutos (DTO).
     * Útil para converter dados vindos de uma API ou formulário em uma instância da classe.
     *
     * @param data - Objeto contendo os dados da pessoa conforme a estrutura da API/DB.
     * @returns Uma nova instância de Pessoa.
     */
    static fromApiData(data: PessoaApiData): Pessoa {
        // Converte os nomes dos campos do DB para os nomes da classe Pessoa
        return new Pessoa({
            uid: data.uid,
            nomeCompleto: data.nome_completo,
            cpf: data.cpf,
            telefone: data.telefone,
            email: data.email,
            instagram: data.instagram,
            profissao: data.profissao,
            dataNascimento: data.data_nascimento, // Passa a string para o construtor converter
            estadoCivil: data.estado_civil,
            tamanhoCamiseta: data.camiseta,
            urlFotoPerfil: data.url_foto_perfil,
            createdAt: data.created_at,

            // Campos de Endereço
            cep: data.cep,
            rua: data.rua,
            numero: data.numero,
            complemento: data.complemento,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,

            // Campos de Dados Religiosos
            paroquia: data.paroquia,
            batizado: data.batizado,
            eucaristia: data.eucaristia,
            crisma: data.crisma,
            matrimonio: data.matrimonio,

            // Campos de Dados de Saúde
            peso: data.peso,
            altura: data.altura,
            alergia: data.alergia,
            qualAlergia: data.qual_alergia,
            doencaCronica: data.doenca_cronica,
            qualDoenca: data.qual_doenca,
            tratamentoMedico: data.tratamento_medico,
            qualTratamento: data.qual_tratamento,
            medicamentoControlado: data.medicamento_controlado,
            qualMedicamento: data.qual_medicamento,
            planoDeSaude: data.plano_de_saude,
            qualPlano: data.qual_plano,

            // Campos de Contato de Emergência
            contatoEmergenciaNome: data.contato_emergencia,
            contatoEmergenciaCelular: data.telefone_emergencia,
        });
    }

    /**
     * Converte a instância da classe Pessoa em um objeto JavaScript puro (JSON-ready)
     * que corresponde à estrutura esperada pela API/DB.
     *
     * @returns Um objeto puro com os dados da pessoa no formato da API/DB.
     */
    toApiData(): PessoaApiData {
        return {
            uid: this.uid,
            nome_completo: this.nomeCompleto,
            cpf: this.cpf,
            telefone: this.telefone,
            email: this.email,
            instagram: this.instagram,
            profissao: this.profissao,
            data_nascimento: this.dataNascimento.toISOString().split('T')[0], // YYYY-MM-DD
            estado_civil: this.estadoCivil,
            camiseta: this.tamanhoCamiseta,
            url_foto_perfil: this.urlFotoPerfil,
            created_at: this.createdAt?.toISOString(), // Converte Date para string ISO, se existir

            // Endereço
            cep: this.endereco.cep,
            rua: this.endereco.rua,
            numero: this.endereco.numero,
            complemento: this.endereco.complemento,
            bairro: this.endereco.bairro,
            cidade: this.endereco.cidade,
            estado: this.endereco.estado,

            // Dados Religiosos
            paroquia: this.dadosReligiosos.paroquia,
            batizado: this.dadosReligiosos.batizado,
            eucaristia: this.dadosReligiosos.eucaristia,
            crisma: this.dadosReligiosos.crisma,
            matrimonio: this.dadosReligiosos.matrimonio,

            // Dados de Saúde
            peso: this.dadosSaude.peso,
            altura: this.dadosSaude.altura,
            alergia: this.dadosSaude.alergia,
            qual_alergia: this.dadosSaude.qualAlergia,
            doenca_cronica: this.dadosSaude.doencaCronica,
            qual_doenca: this.dadosSaude.qualDoenca,
            tratamento_medico: this.dadosSaude.tratamentoMedico,
            qual_tratamento: this.dadosSaude.qualTratamento,
            medicamento_controlado: this.dadosSaude.medicamentoControlado,
            qual_medicamento: this.dadosSaude.qualMedicamento,
            plano_de_saude: this.dadosSaude.planoDeSaude,
            qual_plano: this.dadosSaude.qualPlano,

            // Contato de Emergência
            contato_emergencia: this.contatoEmergencia?.nome,
            telefone_emergencia: this.contatoEmergencia?.celular,
        };
    }
}
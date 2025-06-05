/**
 * Representa uma pessoa com informações pessoais, de contato, endereço e dados religiosos.
 */
export default class Pessoas {
    readonly uid?: string; // ID único da pessoa, geralmente gerado pelo banco de dados
    private _nome: string;
    private _cpf: string;
    private _celular: string;
    private _dataNascimento: Date; // Data de nascimento como objeto Date
    private _instagram?: string;
    private _estadoCivil?: string;

    private _cep: string;
    private _numero: string;
    private _complemento?: string;

    private _paroquia?: string;
    private _batismo?: boolean;
    private _eucaristia?: boolean;
    private _crisma?: boolean;
    private _matrimonio?: boolean;

    private _tamanhoCamiseta?: string;
    private _contatoEmergencia?: string;
    private _celularContato?: string;

    private _fotoPerfil?: string;

    /**
     * Construtor da classe Pessoas.
     * @param nome - Nome completo da pessoa (obrigatório).
     * @param cpf - CPF da pessoa (obrigatório).
     * @param celular - Número de celular da pessoa (obrigatório).
     * @param dataNascimento - Data de nascimento da pessoa (obrigatório, pode ser Date ou string ISO).
     * @param cep - CEP do endereço da pessoa (obrigatório).
     * @param numero - Número do endereço da pessoa (obrigatório).
     * @param uid - ID único da pessoa (opcional, para pessoas já existentes).
     * @param instagram - Nome de usuário do Instagram (opcional).
     * @param estadoCivil - Estado civil da pessoa (opcional).
     * @param complemento - Complemento do endereço (opcional).
     * @param paroquia - Nome da paróquia (opcional).
     * @param batismo - Indica se a pessoa é batizada (opcional).
     * @param eucaristia - Indica se a pessoa recebeu a eucaristia (opcional).
     * @param crisma - Indica se a pessoa é crismada (opcional).
     * @param matrimonio - Indica se a pessoa é casada pela igreja (opcional).
     * @param tamanhoCamiseta - Tamanho da camiseta (opcional).
     * @param contatoEmergencia - Nome do contato de emergência (opcional).
     * @param celularContato - Celular do contato de emergência (opcional).
     * @param fotoPerfil - Foto de Perfil da pessoa (opcional).
     */
    constructor(
        nome: string,
        cpf: string,
        celular: string,
        dataNascimento: Date | string,
        cep: string,
        numero: string,
        uid?: string,
        instagram?: string,
        estadoCivil?: string,
        complemento?: string,
        paroquia?: string,
        batismo?: boolean,
        eucaristia?: boolean,
        crisma?: boolean,
        matrimonio?: boolean,
        tamanhoCamiseta?: string,
        contatoEmergencia?: string,
        celularContato?: string,
        fotoPerfil?: string
    ) {
        // Validações básicas para campos obrigatórios
        if (!nome) throw new Error("O nome é obrigatório.");
        if (!cpf) throw new Error("O CPF é obrigatório.");
        if (!celular) throw new Error("O celular é obrigatório.");
        if (!dataNascimento) throw new Error("A data de nascimento é obrigatória.");
        if (!cep) throw new Error("O CEP é obrigatório.");
        if (!numero) throw new Error("O número do endereço é obrigatório.");

        this.uid = uid;
        this._nome = nome;
        this._cpf = cpf;
        this._celular = celular;
        // Converte string para Date se necessário, valida se é uma data válida
        this._dataNascimento = typeof dataNascimento === 'string' ? new Date(dataNascimento) : dataNascimento;
        if (isNaN(this._dataNascimento.getTime())) {
            throw new Error("Formato inválido para data de nascimento.");
        }
        this._instagram = instagram;
        this._estadoCivil = estadoCivil;
        this._cep = cep;
        this._numero = numero;
        this._complemento = complemento;
        this._paroquia = paroquia;
        this._batismo = batismo;
        this._eucaristia = eucaristia;
        this._crisma = crisma;
        this._matrimonio = matrimonio;
        this._tamanhoCamiseta = tamanhoCamiseta;
        this._contatoEmergencia = contatoEmergencia;
        this._celularContato = celularContato;
        this._fotoPerfil = fotoPerfil;
    }

    // --- Getters ---
    get nome(): string {
        return this._nome;
    }

    get cpf(): string {
        return this._cpf;
    }

    get celular(): string {
        return this._celular;
    }

    get dataNascimento(): Date {
        return this._dataNascimento;
    }

    get instagram(): string | undefined {
        return this._instagram;
    }

    get estadoCivil(): string | undefined {
        return this._estadoCivil;
    }

    get cep(): string {
        return this._cep;
    }

    get numero(): string {
        return this._numero;
    }

    get complemento(): string | undefined {
        return this._complemento;
    }

    get paroquia(): string | undefined {
        return this._paroquia;
    }

    get batismo(): boolean | undefined {
        return this._batismo;
    }

    get eucaristia(): boolean | undefined {
        return this._eucaristia;
    }

    get crisma(): boolean | undefined {
        return this._crisma;
    }

    get matrimonio(): boolean | undefined {
        return this._matrimonio;
    }

    get tamanhoCamiseta(): string | undefined {
        return this._tamanhoCamiseta;
    }

    get contatoEmergencia(): string | undefined {
        return this._contatoEmergencia;
    }

    get celularContato(): string | undefined {
        return this._celularContato;
    }

    get fotoPerfil(): string | undefined {
        return this._fotoPerfil;
    }

    // --- Setters (Opcional, adicione se precisar que as propriedades sejam mutáveis após a criação) ---
    // Exemplo para 'nome':
    set nome(value: string) {
        if (!value) throw new Error("O nome não pode ser vazio.");
        this._nome = value;
    }
    // Adicione setters para outras propriedades se necessário, com validações apropriadas.

    // --- Método Estático para criar uma instância (Factory Method) ---
    /**
     * Cria uma nova instância de Pessoas a partir de um objeto de dados brutos.
     * Útil para converter dados vindos de uma API ou formulário em uma instância da classe.
     * Espera datas no formato Date ou string (ex: "YYYY-MM-DD" ou ISO 8601).
     * @param dados - Objeto contendo os dados da pessoa.
     * @returns Uma nova instância de Pessoas.
     */
    static criarDeDados(dados: {
        uid?: string;
        nome: string;
        cpf: string;
        celular: string;
        dataNascimento: Date | string;
        instagram?: string;
        estadoCivil?: string;
        cep: string;
        numero: string;
        complemento?: string;
        paroquia?: string;
        batismo?: boolean;
        eucaristia?: boolean;
        crisma?: boolean;
        matrimonio?: boolean;
        tamanhoCamiseta?: string;
        contatoEmergencia?: string;
        celularContato?: string;
        fotoPerfil?: string;
    }): Pessoas {
        // O construtor já contém as validações essenciais
        return new Pessoas(
            dados.nome,
            dados.cpf,
            dados.celular,
            dados.dataNascimento,
            dados.cep,
            dados.numero,
            dados.uid,
            dados.instagram,
            dados.estadoCivil,
            dados.complemento,
            dados.paroquia,
            dados.batismo,
            dados.eucaristia,
            dados.crisma,
            dados.matrimonio,
            dados.tamanhoCamiseta,
            dados.contatoEmergencia,
            dados.celularContato,
            dados.fotoPerfil
        );
    }

    /**
     * Converte a instância da classe Pessoas em um objeto JavaScript puro (JSON-ready).
     * Útil para enviar dados para uma API ou salvar em um banco de dados.
     * As datas são convertidas para string ISO 8601 para fácil transporte.
     * @returns Um objeto puro com os dados da pessoa.
     */
    toObject(): {
        uid?: string;
        nome: string;
        cpf: string;
        celular: string;
        dataNascimento: string; // Retorna como string ISO
        instagram?: string;
        estadoCivil?: string;
        cep: string;
        numero: string;
        complemento?: string;
        paroquia?: string;
        batismo?: boolean;
        eucaristia?: boolean;
        crisma?: boolean;
        matrimonio?: boolean;
        tamanhoCamiseta?: string;
        contatoEmergencia?: string;
        celularContato?: string;
        fotoPerfil?: string;
    } {
        return {
            uid: this.uid,
            nome: this._nome,
            cpf: this._cpf,
            celular: this._celular,
            dataNascimento: this._dataNascimento.toISOString(), // Converte Date para string ISO
            instagram: this._instagram,
            estadoCivil: this._estadoCivil,
            cep: this._cep,
            numero: this._numero,
            complemento: this._complemento,
            paroquia: this._paroquia,
            batismo: this._batismo,
            eucaristia: this._eucaristia,
            crisma: this._crisma,
            matrimonio: this._matrimonio,
            tamanhoCamiseta: this._tamanhoCamiseta,
            contatoEmergencia: this._contatoEmergencia,
            celularContato: this._celularContato,
            fotoPerfil: this._fotoPerfil
        };
    }
}

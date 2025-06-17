export default class Acampamento {
    readonly uid?: string;
    private _nome: string;
    private _dataInicio: Date; 
    private _dataFinal: Date;  
    private _local?: string;
    private _musicaTema?: string;
    private _leituraTema?: string;
    private _cronograma?: string;
    private _arteCamiseta?: string; 
    private _cardapio?: string;

    /**
     * Construtor da classe Acampamento.
     * @param uid - ID único do acampamento (opcional, usado para acampamentos existentes).
     * @param nome - Nome do acampamento (obrigatório).
     * @param dataInicio - Data de início do acampamento (obrigatório, tipo Date ou string no formato ISO).
     * @param dataFinal - Data final do acampamento (obrigatório, tipo Date ou string no formato ISO).
     * @param local - Local do acampamento (opcional).
     * @param musicaTema - Música tema do acampamento (opcional).
     * @param leituraTema - Leitura tema do acampamento (opcional).
     * @param cronograma - Detalhes do cronograma do acampamento (opcional).
     * @param arteCamiseta - URL ou identificador da arte da camiseta (opcional).
     * @param cardapio - Detalhes do cardápio do acampamento (opcional).
     */
    constructor(
        nome: string,
        dataInicio: Date | string, // Aceita Date ou string (para conversão)
        dataFinal: Date | string,  // Aceita Date ou string (para conversão)
         uid?: string,
        local?: string,
        musicaTema?: string,
        leituraTema?: string,
        cronograma?: string,
        arteCamiseta?: string,
        cardapio?: string
    ) {
        if (!nome) {
            throw new Error("Nome do acampamento é obrigatório.");
        }
        if (!dataInicio) {
            throw new Error("Data de início é obrigatória.");
        }
        if (!dataFinal) {
            throw new Error("Data final é obrigatória.");
        }

        this.uid = uid;
        this._nome = nome;
        // Converte strings para Date, se necessário
        this._dataInicio = typeof dataInicio === 'string' ? new Date(dataInicio) : dataInicio;
        this._dataFinal = typeof dataFinal === 'string' ? new Date(dataFinal) : dataFinal;
        this._local = local;
        this._musicaTema = musicaTema;
        this._leituraTema = leituraTema;
        this._cronograma = cronograma;
        this._arteCamiseta = arteCamiseta;
        this._cardapio = cardapio;

        // Validação adicional de datas após conversão
       // if (isNaN(this._dataInicio.getTime())) {
       //     throw new Error("Formato inválido para data de início.");
       // }
      //  if (isNaN(this._dataFinal.getTime())) {
       //     throw new Error("Formato inválido para data final.");
       // }
       // if (this._dataInicio > this._dataFinal) {
       //     throw new Error("Data de início não pode ser posterior à data final.");
       // }
    }

    // --- Getters ---
   

    get nome(): string {
        return this._nome;
    }

    get dataInicio(): Date {
        return this._dataInicio;
    }

    get dataFinal(): Date {
        return this._dataFinal;
    }

    get local(): string | undefined {
        return this._local;
    }

    get musicaTema(): string | undefined {
        return this._musicaTema;
    }

    get leituraTema(): string | undefined {
        return this._leituraTema;
    }

    get cronograma(): string | undefined {
        return this._cronograma;
    }

    get arteCamiseta(): string | undefined {
        return this._arteCamiseta;
    }

    get cardapio(): string | undefined {
        return this._cardapio;
    }


    // --- Método Estático para criar uma instância (Factory Method) ---
    /**
     * Cria uma nova instância de Acampamento a partir de um objeto de dados brutos.
     * Útil para converter dados vindos de uma API ou formulário em uma instância da classe.
     * Espera datas no formato Date ou string (ex: "YYYY-MM-DD" ou ISO 8601).
     * @param dados - Objeto contendo os dados do acampamento.
     * @returns Uma nova instância de Acampamento.
     */
    static criarDeDados(dados: {
        uid?: string;
        nome: string;
        dataInicio: Date | string;
        dataFinal: Date | string;
        local?: string;
        isPendente?: boolean;
        localizacao?: string;
        musicaTema?: string;
        leituraTema?: string;
        cronograma?: string;
        arteCamiseta?: string;
        cardapio?: string;
    }): Acampamento {
        // As validações essenciais já estão no construtor
        return new Acampamento(
            dados.nome,
            dados.dataInicio,
            dados.dataFinal,
            dados.uid,
            dados.local,
            dados.musicaTema,
            dados.leituraTema,
            dados.cronograma,
            dados.arteCamiseta,
            dados.cardapio
        );
    }

    /**
     * Converte a instância da classe Acampamento em um objeto JavaScript puro.
     * Útil para enviar dados para uma API, que geralmente espera objetos JSON simples.
     * As datas são convertidas para string ISO 8601 para fácil transporte.
     * @returns Um objeto puro com os dados do acampamento.
     */
    toObject(): {
        uid?: string;
        nome: string;
        dataInicio: string; // Retorna como string ISO
        dataFinal: string;  // Retorna como string ISO
        local?: string;
        musicaTema?: string;
        leituraTema?: string;
        cronograma?: string;
        arteCamiseta?: string;
        cardapio?: string;
    } {
        return {
            uid: this.uid,
            nome: this._nome,
            dataInicio: this._dataInicio.toISOString(), // Converte Date para string ISO
            dataFinal: this._dataFinal.toISOString(),   // Converte Date para string ISO
            local: this._local,
            musicaTema: this._musicaTema,
            leituraTema: this._leituraTema,
            cronograma: this._cronograma,
            arteCamiseta: this._arteCamiseta,
            cardapio: this._cardapio,
        };
    }
}

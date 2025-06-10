import Pessoas from "./pessoas";

export default class Campista extends Pessoas{
    private _idAcampamento: number; // Campo exclusivo para o ID do acampamento
    private _uidCampista: string;
    private _status: boolean;

    constructor(
        uid: string,
        nome: string,
        celular: string,
        dataNascimento: Date,
        status: boolean,
        idAcampamento: number // Novo campo no construtor
    ) {
        // Chama o construtor da classe pai (Pessoas)
        super(nome, celular, dataNascimento);
        
        // Atribui o campo exclusivo de Campista
        this._idAcampamento = idAcampamento;
        this._uidCampista = uid
        this._status = status
    }

    // Getter para o campo idAcampamento
    get idAcampamento(): number {
        return this._idAcampamento;
    }

    get uidCampista(): string{
        return this._uidCampista
    }
    
    get status(): boolean{
        return this._status;
    }
   
    static criarDeDados(dados: {
        uidCampista: string;
        nome: string;
        celular: string;
        dataNascimento: Date;
        status: boolean
    }): Pessoas {
        // O construtor já contém as validações essenciais
        return new Campista(
            dados.uidCampista,
            dados.nome,
            dados.celular,
            dados.dataNascimento,
            dados.status,
            1
        );
    }

}
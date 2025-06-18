// frontend/src/services/perfilService.ts
import axios from 'axios';

export interface PessoaApiData{
  uid?: number; // Corresponde ao 'uid' SERIAL PRIMARY KEY. Opcional para criação.
  nome_completo: string // Correponde a nome_completo varchar
  telefone: string; // varchar
  email: string; // varchar
  instagram: string // varchar
  peso: number; //number
  altura: number; //number
  camiseta: number // chave estrangerira tabela camiseta
  profissao: string; //varchar
  data_nascimento: Date; //date
  estado_civil: string
  paroquia: string;
  batizado: boolean;
  eucaristia: boolean;
  crisma: boolean;
  matrimonio: boolean;
  contato_emergencia: string;
  telefone_emergencia: string;
  url_foto_perfil: string;
  created_at: Date
  updated_at: Date
}

const API_BASE_URL = 'http://localhost:3001/api/bentoapp/pessoas'; // A URL base da sua API

const pessoaService = {
   /**
   * Busca todas as pessas do backend.
   * @returns Promise<PessoaApiData[]>
   */
  getAll: async (): Promise<PessoaApiData[]> => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          // Lança um erro se a resposta não for OK (status 2xx)
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao buscar Pessoas.');
        }
        const data: PessoaApiData[] = await response.json();
        return data;
      } catch (error) {
        console.error('Erro na requisição GET de pessoas:', error);
        throw error; // Re-lança o erro para ser tratado pelo componente chamador
      }
    },
    /**
   * Cria uma nova pessoa no backend.
   * @param pessoa Os dados da pessoa a ser criado.
   * @returns Promise<PessoaApiData> A Pessoa criado com UID.
   */
  create: async (pessoa: Omit<PessoaApiData, 'uid'>): Promise<PessoaApiData> => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, pessoa, {
            headers: {
                'Content-Type': 'multipart/form-data' // O Axios até seta isso sozinho na maioria dos casos, mas é bom garantir.
            }
      });
        console.log('Pessoa criado:', response);
        return response.data;
    } catch (error: any) {
       console.error('Erro ao criar pessoa:', error.response?.data || error.message);
        throw error;
    }
  },
  /**
   * Atualiza uma pessoa existente no backend.
   * @param uid O UID da pessoa a ser atualizado.
   * @param pessoa Os dados atualizados da pessoa.
   * @returns Promise<PessoaApiData> A Pessoa atualizado.
   */
  update: async (uid: number, pessoa: PessoaApiData): Promise<PessoaApiData> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${uid}`, pessoa, {
            headers: {
                'Content-Type': 'multipart/form-data' // O Axios até seta isso sozinho na maioria dos casos, mas é bom garantir.
            }
      });
        console.log('Pessoa alterada:', response);
        return response.data;
    } catch (error) {
      console.error('Erro na requisição PUT de pessoa:', error);
      throw error;
    }
  },
  /**
   * Deleta uma pessoa do backend.
   * @param uid O UID da pessoa a ser deletado.
   * @returns Promise<void>
   */
  delete: async (uid: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${uid}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao deletar pessoa.');
      }
      // Não há necessidade de retornar dados para uma operação DELETE bem-sucedida
    } catch (error) {
      console.error('Erro na requisição DELETE de pessoa:', error);
      throw error;
    }
  },
  
}
export default pessoaService;
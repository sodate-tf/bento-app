// frontend/src/services/acampamentoService.ts
import axios from 'axios';


// Define a interface para a estrutura dos dados de Pessoa que a API espera/retorna.
// Esta interface AGORA reflete diretamente a estrutura da sua tabela 'pessoa' no PostgreSQL.
export interface AcampamentoApiData {
  uid?: number; // Corresponde ao 'uid' SERIAL PRIMARY KEY. Opcional para criação.
  is_ativo: boolean; // Corresponde a 'is_ativo' BOOLEAN
  nome_acampa: string; // Corresponde a 'nome_acampa' VARCHAR
  slug: string; // Corresponde a 'slug' VARCHAR
  data_inicio: string; // Corresponde a 'data_inicio' DATE (API geralmente usa string para datas)
  data_final: string; // Corresponde a 'data_final' DATE (API geralmente usa string para datas)
  local: string; // Corresponde a 'local' VARCHAR
  taxa_equipe: number; // Corresponde a 'taxa_equipe' NUMERIC
  taxa_externa: number; // Corresponde a 'taxa_externa' NUMERIC
  taxa_campista: number; // Corresponde a 'taxa_campista' NUMERIC
  chave_pix: string; // Corresponde a 'chave_pix' VARCHAR
  url_link_pagamento: string; // Corresponde a 'url_link_pagamento' VARCHAR
  musica_tema: string; // Corresponde a 'musica_tema' VARCHAR
  leitura_tema: string; // Corresponde a 'leitura_tema' VARCHAR
  cronograma: string; // Corresponde a 'cronograma' TEXT
  arte_camiseta: string; // Corresponde a 'arte_camiseta' TEXT
  cardapio: string; // Corresponde a 'cardapio' TEXT
}

const API_BASE_URL = 'http://localhost:3001/api/bentoapp/acampamentos'; // A URL base da sua API

const acampamentoService = {
  /**
   * Busca todos os acampamentos do backend.
   * @returns Promise<AcampamentoApiData[]>
   */
  getAll: async (): Promise<AcampamentoApiData[]> => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        // Lança um erro se a resposta não for OK (status 2xx)
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao buscar acampamentos.');
      }
      const data: AcampamentoApiData[] = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na requisição GET de acampamentos:', error);
      throw error; // Re-lança o erro para ser tratado pelo componente chamador
    }
  },
  
 
  /**
   * Cria um novo acampamento no backend.
   * @param acampamento Os dados do acampamento a ser criado.
   * @returns Promise<AcampamentoApiData> O acampamento criado com UID.
   */
  create: async (acampamento: Omit<AcampamentoApiData, 'uid'>): Promise<AcampamentoApiData> => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, acampamento, {
            headers: {
                'Content-Type': 'multipart/form-data' // O Axios até seta isso sozinho na maioria dos casos, mas é bom garantir.
            }
      });
        console.log('Acampamento criado:', response);
        return response.data;
    } catch (error: any) {
       console.error('Erro ao criar acampamento:', error.response?.data || error.message);
        throw error;
    }
  },

   /**
   * Recupera o link de inscrição de campistas do acampamento.
   * @param uid O UID do acampamento a ser atualizado.
   * @returns Promise<AcampamentoApiData> O link de inscrição.
   */
   getLink: async (uid: string) : Promise<AcampamentoApiData> => {
     try {
         const response = await fetch(`${API_BASE_URL}/getlink/${uid}`);
         if (!response.ok) {
            // Lança um erro se a resposta não for OK (status 2xx)
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar acampamentos.');
          }
          const data: AcampamentoApiData = await response.json();
          return data;
     } catch (error) {
        console.error('Erro na requisição GET de acampamentos:', error);
      throw error; // Re-lança o erro para ser tratado pelo componente chamador
     }
   },
     
    /**
   * Recupera os acampamentos ativos.
   * @returns Retorna o uid e nome_acampa de todos os acampamentos ativos.
   */ 
   getAcampasAtivos: async () : Promise<AcampamentoApiData> =>{
      try {
         const response = await fetch(`${API_BASE_URL}/acoes/getacampasativos`);
         if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao buscar acampamentos ativos.')
         }
         const data: AcampamentoApiData = await response.json();
         return data;
      } catch (error) {
          console.error('Erro na requisição GET de Acampamentos:', error)
          throw error;
      }
   },


  /**
   * Atualiza um acampamento existente no backend.
   * @param uid O UID do acampamento a ser atualizado.
   * @param acampamento Os dados atualizados do acampamento.
   * @returns Promise<AcampamentoApiData> O acampamento atualizado.
   */
  update: async (uid: number, acampamento: AcampamentoApiData): Promise<AcampamentoApiData> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${uid}`, acampamento, {
            headers: {
                'Content-Type': 'multipart/form-data' // O Axios até seta isso sozinho na maioria dos casos, mas é bom garantir.
            }
      });
        console.log('Acampamento alterado:', response);
        return response.data;
    } catch (error) {
      console.error('Erro na requisição PUT de acampamento:', error);
      throw error;
    }
  },

  /**
   * Deleta um acampamento do backend.
   * @param uid O UID do acampamento a ser deletado.
   * @returns Promise<void>
   */
  delete: async (uid: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${uid}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao deletar acampamento.');
      }
      // Não há necessidade de retornar dados para uma operação DELETE bem-sucedida
    } catch (error) {
      console.error('Erro na requisição DELETE de acampamento:', error);
      throw error;
    }
  },
};

export default acampamentoService;

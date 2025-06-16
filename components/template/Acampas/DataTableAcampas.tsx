// frontend/src/components/dataTable/Acampamentos/DataTableAcampas.tsx
import React, { useState, useEffect } from 'react';
import AcampamentosClass from "@/components/context/acampamentos";
import { Acampamento, columns } from "@/components/dataTable/Acampamentos/columns";
import { DataTable } from "@/components/dataTable/Acampamentos/data-table";
import acampamentoService, { AcampamentoApiData } from '@/src/service/acampamentoService'; // Importa a interface AcampamentoApiData

export default function DataTableAcampas() {
  const [acampamentos, setAcampamentos] = useState<Acampamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAcampamentosData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Busca os dados do backend usando o serviço
        const backendData: AcampamentoApiData[] = await acampamentoService.getAll();

        // Mapeia os dados do backend (que agora seguem a estrutura da tabela SQL)
        // para o formato esperado pela sua classe Acampamento.
        const transformedData: Acampamento[] = backendData.map((acampaData: AcampamentoApiData) => {
          return AcampamentosClass.criarDeDados({
            // Mapeia os campos do backend para os campos da sua classe/interface Acampamento
            uid: acampaData.uid ? acampaData.uid.toString() : '', // Converte number para string
            nome: acampaData.nome_acampa, // Usa 'nome_acampa' da API
            dataInicio: new Date(acampaData.data_inicio), // Converte string de data para Date
            dataFinal: new Date(acampaData.data_final),   // Converte string de data para Date
            // Adicione outras propriedades de AcampamentoApiData que sua classe Acampamento espera
            isPendente: acampaData.is_ativo === false, // Exemplo: se 'is_ativo' for false, considere 'isPendente' true
            localizacao: acampaData.local, // Usa 'local' da API
            // Outros campos da sua tabela SQL que podem ser relevantes para AcampamentoClass
            // Exemplo:
            // capacidade: acampaData.capacidade,
            // preco_por_pessoa: acampaData.taxa_campista, // Ajuste para o campo correto se necessário
            // cronograma: acampaData.cronograma,
            // musica_tema: acampaData.musica_tema,
            // etc.
          });
        });
        setAcampamentos(transformedData);
      } catch (err: any) {
        console.error("Erro ao buscar acampamentos:", err);
        setError(err.message || "Não foi possível carregar os acampamentos.");
      } finally {
        setLoading(false);
      }
    };

    fetchAcampamentosData();
  }, []); // O array vazio [] garante que esta função seja executada apenas uma vez após a montagem inicial

  if (loading) {
    return (
      <div className="flex flex-col mx-auto py-10 w-full text-center text-gray-700">
        <p>Carregando acampamentos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col mx-auto py-10 w-full text-center text-red-600">
        <p>Erro ao carregar acampamentos: {error}</p>
        <p>Por favor, verifique se o servidor backend está rodando e acessível.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto py-10 w-full">
      <DataTable columns={columns} data={acampamentos} />
    </div>
  );
}

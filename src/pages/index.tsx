"use client"; // ESSENCIAL: Esta diretiva deve ser a primeira linha
import Layout from "@/components/template/Layout";
import React, { useState } from 'react';

import { Button } from '@/components/ui/button'; // Componente Button do Shadcn UI
import { Eye, EyeOff } from 'lucide-react'; // Ícones de olho aberto e fechado
import { cn } from '@/lib/utils'; // Utilitário para combinar classes CSS (se houver)
import DashboardCard from "@/components/template/Dashboard/DashboardCard";
import AgeDistributionChart from "@/components/template/Dashboard/AgeDistributionChart";
import TShirtSizeDistributionChart from "@/components/template/Dashboard/TShirtDistributionCharts";




export default function Home() {
  // Estado para controlar a exibição de todos os valores no dashboard
  const [showAllValues, setShowAllValues] = useState<boolean>(true);

  // Simula o total de pré-inscritos e novos dados da equipe
  const totalPreInscritos = 123;
  const totalEquipeTrabalho = 125;
  const totalEquipeTrabalhoPago = 100;
  const totalPagos = 42;
  const saldoInscricoes = "R$ 6.300,00";
  const saldoInscricoesEquipe = "R$ 4.200,00"
  
  // Simula estados de carregamento para os dados
  const [loadingPreInscritos, setLoadingPreInscritos] = useState<boolean>(false);
  const [loadingAgeData, setLoadingAgeData] = useState<boolean>(false);
  const [loadingTShirtData, setLoadingTShirtData] = useState<boolean>(false);

  // Dados simulados de tamanhos de camisetas
  const simulatedTShirtSizes = {
    "PP": 5,
    "P": 20,
    "M": 45,
    "G": 30,
    "GG": 15,
    "XG": 8,
    "XXG": 2
  };

  // Função para alternar a visibilidade de todos os valores no dashboard
  const toggleShowAllValues = () => {
    setShowAllValues(prev => !prev);
  };

  // Função auxiliar para gerar dados simulados de idades brutas
  const generateRawAgesData = (numPeople: number): number[] => {
    const ages: number[] = [];
    for (let i = 0; i < numPeople; i++) {
      // Simula idades entre 5 e 85 anos
      ages.push(Math.floor(Math.random() * (85 - 5 + 1)) + 5); 
    }
    return ages;
  };

  // Gera os dados simulados de idades brutas
  const simulatedRawAges = generateRawAgesData(totalPreInscritos);

  return (
    <Layout titulo="Página Inicial" subTitulo="Estamos Construindo um Template Admin">
      {/* Container principal do dashboard com estilo moderno */}
      <div className="container mx-auto p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-2xl my-8 max-w-6xl min-h-[calc(100vh-64px)] flex flex-col transform transition-all duration-300 ease-in-out hover:shadow-3xl">
        
        {/* Cabeçalho do dashboard com título e botão de alternância */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">Visão Geral do Evento</h2>
          
          {/* Botão para alternar a visibilidade de todos os valores */}
          <Button
            variant="default" // Usando variante 'default' para um botão mais proeminente
            size="lg" // Tamanho maior
            onClick={toggleShowAllValues}
            className="flex items-center space-x-2 px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out 
                       bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            title={showAllValues ? "Ocultar Valores" : "Exibir Valores"}
          >
            {showAllValues ? (
              <>
                <EyeOff className="h-6 w-6" />
                <span>Ocultar Valores</span>
              </>
            ) : (
              <>
                <Eye className="h-6 w-6" />
                <span>Exibir Valores</span>
              </>
            )}
          </Button>
        </div>

        {/* Grid de Cards do Dashboard com design aprimorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {/* Cada DashboardCard deve ter um estilo moderno por si só.
              Assumimos que DashboardCard já tem sombras, bordas arredondadas e bom espaçamento interno.
              Para um visual ainda mais moderno, você pode adicionar animações de hover no DashboardCard. */}
          <DashboardCard
            title="Total de Pré-Inscritos"
            value={totalPreInscritos}
            linkHref="/pre-inscricoes" 
            showValues={showAllValues}
            loading={loadingPreInscritos}
          />

          <DashboardCard
            title="Total de Confirmados"
            value={totalPagos}
            linkHref="/pre-inscricoes" 
            showValues={showAllValues}
            loading={loadingPreInscritos}
          />

          <DashboardCard
            title="Saldo de Inscrições"
            value={saldoInscricoes}
            linkHref="/pre-inscricoes" 
            showValues={showAllValues}
            loading={loadingPreInscritos}
          />

          <DashboardCard
            title="Total Equipe de Trabalho"
            value={totalEquipeTrabalho}
            linkHref="/equipe" 
            showValues={showAllValues}
            loading={loadingPreInscritos}
          />
          
          <DashboardCard
            title="Equipe com Pagamento Confirmado"
            value={totalEquipeTrabalhoPago}
            linkHref="/equipe" 
            showValues={showAllValues}
            loading={loadingPreInscritos}
          />

          <DashboardCard
            title="Saldo da Equipe"
            value={saldoInscricoesEquipe}
            linkHref="/equipe" 
            showValues={showAllValues}
            loading={loadingPreInscritos}
          />

          {/* Cards de Gráfico que ocupam a largura total */}
          <div className="col-span-full bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out hover:shadow-xl"> 
            <AgeDistributionChart
              rawAges={simulatedRawAges} 
              displayStartAge={30}        
              displayEndAge={85}          
              showValues={showAllValues}
              loading={loadingAgeData}
            />
          </div>

          <div className="col-span-full bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out hover:shadow-xl"> 
            <TShirtSizeDistributionChart
              sizeData={simulatedTShirtSizes} 
              showValues={showAllValues}
              loading={loadingTShirtData}
            />
          </div>
        </div>
      </div>
    </Layout> 
  )
}

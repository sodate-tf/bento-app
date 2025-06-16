"use client"; // ESSENCIAL: Esta diretiva deve ser a primeira linha para componentes que usam hooks ou interatividade no cliente

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils'; // Utilitário para combinar classes CSS, se você o tiver configurado

// Interface para um grupo de idade e sua contagem
interface AgeGroup {
  range: string; // Ex: "0-4", "5-9"
  count: number;
  start: number; // Idade inicial do grupo
  end: number;   // Idade final do grupo
}

// Propriedades esperadas para o componente AgeDistributionChart
interface AgeDistributionChartProps {
  rawAges: number[]; // A lista de todas as idades dos inscritos
  displayStartAge: number; // Idade mínima para incluir no gráfico
  displayEndAge: number;   // Idade máxima para incluir no gráfico
  showValues: boolean; // Controla se os valores numéricos são exibidos acima das barras
  loading?: boolean; // Estado de carregamento dos dados do gráfico
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({
  rawAges,
  displayStartAge,
  displayEndAge,
  showValues,
  loading = false, // Define o valor padrão para 'loading' como false
}) => {
  const GROUP_INTERVAL = 5; // O intervalo fixo para agrupar idades (a cada 5 anos)
  const BAR_CHART_AREA_HEIGHT = 200; // Altura máxima para a área de desenho das barras (em pixels)
  const MIN_BAR_HEIGHT_PX = 4; // Altura mínima para uma barra, mesmo que a contagem seja 0, para torná-la visível

  // useMemo para otimizar o cálculo dos dados agrupados e do valor máximo,
  // recalculando apenas quando 'rawAges', 'displayStartAge' ou 'displayEndAge' mudarem.
  const { groupedData, maxCount } = useMemo(() => {
    const ageGroups: AgeGroup[] = [];

    // Filtra as idades brutas para incluir apenas aquelas dentro da faixa de exibição
    const filteredAges = rawAges.filter(age => age >= displayStartAge && age <= displayEndAge);

    // Itera pela faixa de exibição definida para criar os grupos de idade e contá-los
    for (let i = displayStartAge; i <= displayEndAge; i += GROUP_INTERVAL) {
      const groupStart = i;
      // Garante que o grupo não ultrapasse a 'displayEndAge'
      const groupEnd = Math.min(i + GROUP_INTERVAL - 1, displayEndAge);
      const rangeLabel = `${groupStart}-${groupEnd}`;

      let count = 0;
      // Conta quantas idades filtradas caem dentro do intervalo deste grupo
      for (const age of filteredAges) {
        if (age >= groupStart && age <= groupEnd) {
          count++;
        }
      }
      ageGroups.push({ range: rangeLabel, count, start: groupStart, end: groupEnd });
    }

    // Filtra os grupos finais para garantir que estejam dentro da faixa e os ordena
    const finalGroupedData = ageGroups
      .filter(group => group.start <= displayEndAge && group.end >= displayStartAge)
      .sort((a, b) => a.start - b.start); // Garante a ordem numérica correta das faixas etárias

    // Calcula a contagem máxima para dimensionar as barras do gráfico.
    // Se não houver dados, 'maxCount' é definido como 1 para evitar divisão por zero.
    const currentMaxCount = Math.max(0, ...finalGroupedData.map(item => item.count));

    return { 
      groupedData: finalGroupedData, 
      maxCount: currentMaxCount === 0 ? 1 : currentMaxCount // Evita divisão por zero se todos os counts forem 0
    }; 
  }, [rawAges, displayStartAge, displayEndAge]); // Dependências do useMemo

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-auto min-h-[350px] flex flex-col">
      {/* Título do gráfico */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center">
        Resumo de Idades dos Pré-Inscritos ({displayStartAge}-{displayEndAge} anos)
      </h3>
      {/* Exibe um indicador de carregamento se 'loading' for true */}
      {loading ? (
        <div className="flex-grow flex items-center justify-center text-gray-500">Carregando dados do gráfico...</div>
      ) : (
        // Contêiner flexível para as barras do gráfico
        <div className="flex flex-grow items-end justify-center space-x-2 md:space-x-4 pt-8 h-[250px]">
          {/* Mensagem se não houver dados */}
          {groupedData.length === 0 || rawAges.length === 0 ? (
            <div className="flex-grow flex items-center justify-center text-gray-500">Nenhum dado de idade disponível para esta faixa ou para a análise.</div>
          ) : (
            // Mapeia os dados agrupados para renderizar cada barra do gráfico
            groupedData.map((item, index) => (
              <div key={index} className="flex flex-col items-center h-full justify-end group min-w-[50px] md:min-w-[60px]">
                {/* Exibe a contagem numérica se 'showValues' for true */}
                {showValues && (
                  <span className="text-xs font-bold text-gray-700 mb-1">
                    {item.count}
                  </span>
                )}
                {/* A barra do gráfico em si, com altura calculada dinamicamente */}
                <div
                  className="bg-blue-500 w-full rounded-t-md relative transition-all duration-500 ease-out flex items-end justify-center hover:bg-blue-600"
                  style={{ 
                    // Garante uma altura mínima para a barra e a dimensiona proporcionalmente à contagem máxima
                    height: `${Math.max(MIN_BAR_HEIGHT_PX, (item.count / maxCount) * BAR_CHART_AREA_HEIGHT)}px` 
                  }}
                >
                </div>
                {/* Rótulo da faixa etária */}
                <span className="text-[10px] md:text-xs font-medium text-gray-600 mt-2 text-center break-words w-full">
                  {item.range}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AgeDistributionChart;

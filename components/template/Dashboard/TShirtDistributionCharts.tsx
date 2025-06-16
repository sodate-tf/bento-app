"use client"; // ESSENCIAL: Esta diretiva deve ser a primeira linha para componentes interativos no cliente

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils'; // Utilitário para combinar classes CSS, se você o tiver configurado

// Interface para os dados de tamanho de camiseta (ex: { "P": 10, "M": 25 })
interface TShirtSizeData {
  [size: string]: number; // Chave é o tamanho, valor é a contagem
}

// Propriedades esperadas para o componente TShirtSizeDistributionChart
interface TShirtSizeDistributionChartProps {
  sizeData: TShirtSizeData; // Objeto com tamanhos de camiseta e suas contagens
  showValues: boolean;      // Controla se os valores numéricos são exibidos acima das barras
  loading?: boolean;        // Estado de carregamento dos dados do gráfico
}

const TShirtSizeDistributionChart: React.FC<TShirtSizeDistributionChartProps> = ({
  sizeData,
  showValues,
  loading = false, // Define o valor padrão para 'loading' como false
}) => {
  const BAR_CHART_AREA_HEIGHT = 200; // Altura máxima para a área de desenho das barras (em pixels)
  const MIN_BAR_HEIGHT_PX = 4;      // Altura mínima para uma barra para torná-la visível

  // useMemo para otimizar o cálculo dos dados do gráfico e do valor máximo,
  // recalculando apenas quando 'sizeData' mudar.
  const { chartData, maxCount } = useMemo(() => {
    // Converte o objeto 'sizeData' em um array de objetos para fácil iteração (ex: [{ size: "P", count: 10 }])
    const dataArray = Object.entries(sizeData)
      .map(([size, count]) => ({ size, count }))
      .sort((a, b) => { // Ordena os tamanhos para uma exibição consistente (PP, P, M, G, GG, etc.)
        const order = { "PP": 0, "P": 1, "M": 2, "G": 3, "GG": 4, "XG": 5, "XXG": 6 };
        // Garante que tamanhos não mapeados (como "Único" ou personalizados) apareçam após os padrões
        return (order[a.size as keyof typeof order] || 99) - (order[b.size as keyof typeof order] || 99);
      });

    // Calcula a contagem máxima para dimensionar as barras do gráfico.
    // Se não houver dados, 'maxCount' é definido como 1 para evitar divisão por zero.
    const currentMaxCount = Math.max(0, ...dataArray.map(item => item.count));

    return { 
      chartData: dataArray, 
      maxCount: currentMaxCount === 0 ? 1 : currentMaxCount // Evita divisão por zero se todos os counts forem 0
    }; 
  }, [sizeData]); // Dependência do useMemo

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-auto min-h-[350px] flex flex-col">
      {/* Título do gráfico */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center">
        Resumo de Tamanhos de Camisetas
      </h3>
      {/* Exibe um indicador de carregamento se 'loading' for true */}
      {loading ? (
        <div className="flex-grow flex items-center justify-center text-gray-500">Carregando dados das camisetas...</div>
      ) : (
        // Contêiner flexível para as barras do gráfico
        <div className="flex flex-grow items-end justify-center space-x-2 md:space-x-4 pt-8 h-[250px]">
          {/* Mensagem se não houver dados */}
          {chartData.length === 0 || Object.keys(sizeData).length === 0 ? (
            <div className="flex-grow flex items-center justify-center text-gray-500">Nenhum dado de tamanho de camiseta disponível.</div>
          ) : (
            // Mapeia os dados do gráfico para renderizar cada barra
            chartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center h-full justify-end group min-w-[50px] md:min-w-[60px]">
                {/* Exibe a contagem numérica se 'showValues' for true */}
                {showValues && (
                  <span className="text-xs font-bold text-gray-700 mb-1">
                    {item.count}
                  </span>
                )}
                {/* A barra do gráfico em si, com altura calculada dinamicamente */}
                <div
                  className="bg-purple-500 w-full rounded-t-md relative transition-all duration-500 ease-out flex items-end justify-center hover:bg-purple-600"
                  style={{ 
                    // Garante uma altura mínima para a barra e a dimensiona proporcionalmente à contagem máxima
                    height: `${Math.max(MIN_BAR_HEIGHT_PX, (item.count / maxCount) * BAR_CHART_AREA_HEIGHT)}px` 
                  }}
                >
                </div>
                {/* Rótulo do tamanho da camiseta */}
                <span className="text-[10px] md:text-xs font-medium text-gray-600 mt-2 text-center break-words w-full">
                  {item.size}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TShirtSizeDistributionChart;

"use client";

import React from 'react';
import { Button } from '@/components/ui/button'; // Supondo que você tenha o componente Button do Shadcn UI
import { useRouter } from 'next/navigation'; // Importa o useRouter para navegação
import { cn } from '@/lib/utils'; // Utilitário para combinar classes CSS

interface DashboardCardProps {
  title: string;
  value: number | string;
  linkHref?: string; // URL para onde o card deve navegar ao ser clicado
  showValues: boolean; // Controla se o valor deve ser exibido ou ocultado
  loading?: boolean; // Estado de carregamento do valor
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  linkHref,
  showValues,
  loading = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (linkHref) {
      router.push(linkHref);
    }
  };

  const displayValue = () => {
    if (loading) {
      return 'Carregando...'; // Exibe mensagem de carregamento
    }
    return showValues ? value : '*****'; // Exibe o valor ou asteriscos
  };

  return (
    <Button
      onClick={handleClick}
      // Usamos 'asChild' no Button para que ele não renderize um <a> aninhado se linkHref for fornecido
      // No entanto, para simplicidade e controle visual direto, vamos manter o Button com o onClick.
      // A classe 'cursor-pointer' já indica que é clicável.
      className={cn(
        "flex flex-col items-center justify-center p-6 bg-white rounded-none hover:bg-slate-300 shadow-md hover:shadow-lg transition-all duration-300 text-gray-200",
        "w-full h-40 md:w-60 md:h-48 cursor-pointer transform hover:scale-105", // Responsividade e efeito hover
        {
          "opacity-70 cursor-not-allowed": loading // Estilo para estado de carregamento
        }
      )}
      disabled={loading}
    >
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-center  text-gray-700">{title}</h3>
      <p className="text-3xl md:text-4xl font-bold text-cyan-950">
        {displayValue()}
      </p>
      {linkHref && !loading && (
        <span className="mt-2 text-sm text-cyan-950 hover:underline">Ver Detalhes</span>
      )}
    </Button>
  );
};

export default DashboardCard;

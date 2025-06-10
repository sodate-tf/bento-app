"use client"; // Necessário para componentes interativos no Next.js App Router

import React, { useState, useEffect } from 'react';
import { differenceInSeconds, isPast, isFuture } from 'date-fns'; // Importamos differenceInSeconds
import { Button } from '@/components/ui/button'; // Supondo o componente Button do Shadcn UI
import { Input } from '@/components/ui/input'; // Supondo o componente Input do Shadcn UI
import { toast } from 'sonner'; // Para feedback ao usuário

// Definimos uma interface mais clara para o estado da duração para incluir 'totalDays'
interface RemainingTime {
  totalDays: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownSectionProps {
  /**
   * A data alvo para a contagem regressiva no formato ISO 8601 (ex: "2025-07-20T10:00:00").
   */
  targetDate: string;
  /**
   * O URL da imagem de fundo para a seção.
   * Ex: "https://placehold.co/1920x1080/4F4F4F/FFFFFF?text=Fundo+Countdown"
   */
  backgroundImageUrl?: string;
  /**
   * O texto do botão principal de inscrição (se aplicável, ou adaptado para subscrição de e-mail).
   */
  mainButtonText?: string;
  /**
   * O URL para onde o botão principal de inscrição deve levar.
   */
  mainSignupUrl?: string;

  isInscricoesAbertas: boolean
}

const CountdownSection: React.FC<CountdownSectionProps> = ({
  targetDate,
  backgroundImageUrl = 'https://placehold.co/1920x1080/4F4F4F/FFFFFF?text=Fundo+Countdown', // Imagem padrão se não for fornecida
  mainButtonText = "Garanta sua Vaga!",
  mainSignupUrl = "#",
  isInscricoesAbertas = false
}) => {
  // Estado para armazenar a duração da contagem regressiva em dias, horas, minutos, segundos
  const [remainingTime, setRemainingTime] = useState<RemainingTime | null>(null);
  // Estado para controlar se a contagem regressiva ainda está ativa
  const [isCountingDown, setIsCountingDown] = useState(true);
  // Estado para o input de e-mail
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const finalDate = new Date(targetDate);

    // Se a data alvo já passou, a contagem regressiva não está ativa
    if (isPast(finalDate)) {
      setIsCountingDown(false);
      setRemainingTime(null);
      console.log("Contagem regressiva já terminou. Data alvo no passado.");
      return;
    }

    const updateCountdown = () => {
      const now = new Date();
      let totalSeconds = differenceInSeconds(finalDate, now); // Calcula a diferença total em segundos

      if (totalSeconds <= 0) {
        setRemainingTime(null);
        setIsCountingDown(false);
        clearInterval(intervalId); // Limpa o intervalo
        toast.info("A contagem regressiva terminou!", {
          description: "O acampamento começou ou as inscrições foram encerradas."
        });
        console.log("Contagem regressiva finalizada!");
        return;
      }

      // Calcula os dias, horas, minutos e segundos a partir do total de segundos
      const totalDays = Math.floor(totalSeconds / (60 * 60 * 24));
      totalSeconds %= (60 * 60 * 24); // Segundos restantes após remover os dias

      const hours = Math.floor(totalSeconds / (60 * 60));
      totalSeconds %= (60 * 60); // Segundos restantes após remover as horas

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      setRemainingTime({ totalDays, hours, minutes, seconds });
    };

    // Chame a função uma vez imediatamente para exibir o estado inicial correto
    updateCountdown(); 
    
    // Configura um intervalo que é executado a cada segundo
    const intervalId = setInterval(updateCountdown, 1000);

    // Função de limpeza para parar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, [targetDate]); // A dependência garante que o efeito reaja se a data alvo mudar

  const handleEmailSubscribe = () => {
    if (!email) {
      toast.error("O campo de e-mail está vazio.", {
        description: "Por favor, insira o seu endereço de e-mail para subscrever."
      });
      return;
    }
    console.log("Subscrever e-mail:", email);
    toast.success("Subscrição Realizada!", {
      description: `Obrigado por subscrever com ${email}. Manter-lhe-emos atualizado!`,
    });
    setEmail('');
  };

  // Valores a serem exibidos (usar 0 se ainda não calculados ou a contagem terminou)
  const displayDays = remainingTime?.totalDays ?? 0;
  const displayHours = remainingTime?.hours ?? 0;
  const displayMinutes = remainingTime?.minutes ?? 0;
  const displaySeconds = remainingTime?.seconds ?? 0;

  return (
    <section 
      id="countdown" 
      className=" bg-cover bg-center bg-fixed relative flex items-center justify-center p-8 overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      {/* Overlay para melhorar a legibilidade do texto sobre a imagem de fundo */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Conteúdo Centralizado */}
      <div className="relative z-10 w-full  max-w-5xl mx-auto flex flex-col items-center justify-center text-center p-8 md:p-12 bg-transparent">
        
        {/* Título Principal */}
        {
            isInscricoesAbertas ? (
                <>
                   <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-wide uppercase drop-shadow-lg">
                        INSCRIÇÕES ABERTAS!
                    </h1>
                    {/* Subtítulo */}
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 drop-shadow-md">
                        GARANTA SUA VAGA NO PRÓXIMO ACAMPABENTO
                    </p>
                </>
            ) : (
                <>
                     <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-wide uppercase drop-shadow-lg">
                        LANÇAMENTO EM BREVE
                    </h1>
                    {/* Subtítulo */}
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 drop-shadow-md">
                        Tempo restante até o lançamento!
                    </p>
                </>
            )
        }
       

        {/* Contagem Regressiva (Números e Rótulos) */}
        <div className="flex flex-col sm:flex-row bg-white/30 pt-10 pr-10 pb-10 pl-15  justify-center items-center sm:items-end space-x-4 sm:space-x-8 mb-12">
          {/* Dias */}
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-none drop-shadow-xl">
              {String(displayDays).padStart(2, '0')}
            </span>
            <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-200 uppercase tracking-wider mt-2">
              Dias
            </span>
          </div>

          {/* Separador (visível apenas em telas maiores para melhor leitura) */}
          <span className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-none hidden sm:block">:</span>

          {/* Horas */}
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-none drop-shadow-xl">
              {String(displayHours).padStart(2, '0')}
            </span>
            <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-200 uppercase tracking-wider mt-2">
              Horas
            </span>
          </div>

          {/* Separador */}
          <span className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-none">:</span>

          {/* Minutos */}
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-none drop-shadow-xl">
              {String(displayMinutes).padStart(2, '0')}
            </span>
            <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-200 uppercase tracking-wider mt-2">
              Minutos
            </span>
          </div>

          {/* Separador */}
          <span className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-none">:</span>

          {/* Segundos */}
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-none drop-shadow-xl">
              {String(displaySeconds).padStart(2, '0')}
            </span>
            <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-200 uppercase tracking-wider mt-2">
              Segundos
            </span>
          </div>
        </div>
            <div className='w-full flex justify-center'>
                <a href="#inscrever" >
                    <Button className='md:py-8 md:px-15 p-5 text-3xl uppercase bg-emerald-900 cursor-pointer hover:bg-emerald-600'>Faça sua inscrição!</Button>
                </a>
            </div>

      </div>
    </section>
  );
};

export default CountdownSection;

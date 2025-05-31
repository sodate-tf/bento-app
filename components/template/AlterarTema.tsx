import React, { useState } from 'react';
// Importações dos seus ícones
import { IconeAjustesTema, IconeClaro, IconeEscuro } from '../icons';
import useAppData from '@/src/data/hook/useAppData';
import AvatarUsuario from './AvatarUsuario';

// Alias para os ícones, conforme você definiu
const IconeSol = IconeClaro;
const IconeLua = IconeEscuro;

export default function BotaoalterarTema() {

  const { tema, alternarTema } = useAppData();
  const [sol, setSol] = useState('')
  const [lua, setLua] = useState('')
  function setarTema() {
    if(tema === ''){
        setLua('hidden')
        setSol('')
    } else{
        setLua('')
        setSol('hidden')
    }
    
    if (alternarTema)
      alternarTema()
  
    
  }

  return (
    <div className='flex flex-grow justify-end items-center'>
    <div className='fixed top-4 right-4 z-50'>
        <AvatarUsuario />
    </div>
    <div className="fixed top-4 right-16 z-50 group">
       
      {/* Contêiner do menu com efeito de expansão/deslize */}
      <div
        className={`
          flex items-center gap-2 bg-purple-700 text-white p-2 rounded-full shadow-lg
          transition-all duration-300 ease-in-out
          w-10 px-2
          group-hover:w-auto group-hover:pr-4 group-hover:pl-2
          max-w-[250px]
          overflow-hidden
        `}
      >
        {/* Ícone principal - Renderizado como componente com classes */}
        {IconeAjustesTema/* Assumindo que IconeAjustesTema é um componente React (ex: <svg/>, <path/>) */}
        

        {/* Texto "Alterar tema" com efeito de opacidade e visibilidade */}
        <span
          className={`
            whitespace-nowrap                                     /* Impede que o texto quebre linha */
            transition-opacity duration-200 ease-in-out delay-100 /* Transição de opacidade com um pequeno delay */
            opacity-0 group-hover:opacity-100                     /* Inicialmente invisível, fica visível no hover */
            hidden group-hover:block                              /* Esconde com display:none e mostra com display:block no hover */
            flex-grow-0 flex-shrink-0                             /* Garante que o span não empurre o ícone */
          `}
        >
          Alterar tema
        </span>

        {/* Opções de Tema (Claro/Escuro) - aparecem com opacidade */}
        <div
          className={`
            flex gap-2 ml-auto
            transition-opacity duration-200 ease-in-out delay-100
            opacity-0 group-hover:opacity-100
            hidden group-hover:block
            flex-shrink-0
          `}
        >
          {/* Botão Claro */}
          <button
            onClick={() => setarTema()} // Seu handler de click
            className={`${sol}
              p-1 rounded-full text-sm font-semibold
              ${tema === '' ? 'bg-purple-900' : 'bg-purple-600 hover:bg-purple-500'} /* Lógica para cor do botão */
              focus:outline-none focus:ring-2 focus:ring-purple-300
            `}
            aria-label="Ativar tema claro"
            title="Tema Claro"
          >
            <span className="h-5 w-5" />
            {IconeSol/* Ícone do Sol - Renderizado como componente com classes */}
          </button>

          {/* Botão Escuro */}
          <button
            onClick={() => setarTema()} // Seu handler de click
            className={`${lua}
              p-1 rounded-full text-sm font-semibold
              ${tema === 'dark' ? 'bg-purple-900' : 'bg-purple-600 hover:bg-purple-500'} /* Lógica para cor do botão */
              focus:outline-none focus:ring-2 focus:ring-purple-300
            `}
            aria-label="Ativar tema escuro"
            title="Tema Escuro"
          >
            {IconeLua/* Ícone da Lua - Renderizado como componente com classes */}
            <span className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}
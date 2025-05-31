// src/components/FotoAleatoria.jsx (ou FotoAleatoria.tsx)
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const FotoAleatoria = ({ alt = "Foto aleatória" }) => {
  const [randomImageUrl, setRandomImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRandomPhoto = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('/api/random-photos'); // Chama sua API Route
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.success && data.images.length > 0) {
          // Seleciona uma imagem aleatoriamente da lista
          const randomIndex = Math.floor(Math.random() * data.images.length);
          setRandomImageUrl(data.images[randomIndex]);
        } else {
          setError('Nenhuma imagem encontrada ou erro na resposta da API.');
        }
      } catch (e) {
        console.error("Falha ao buscar foto aleatória:", e);
        setError(`Erro ao carregar a foto: ${e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPhoto();
  }, []); // O array vazio garante que isso rode apenas uma vez ao montar o componente

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
      ...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
        Erro: {error}
      </div>
    );
  }

  if (!randomImageUrl) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
        Nenhuma foto disponível.
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden shadow-md">
      <Image
        src={randomImageUrl}
        alt={alt}
        width={1024}
        height={1024}
        className="transition-opacity h-screen object-cover duration-500 max-w-fit" // Exemplo de transição
      />
    </div>
  );
};

export default FotoAleatoria;
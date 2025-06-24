// components/ImagemUploader.js
// Componente React para upload de imagens de perfil para o Vercel Blob.
// Mantém a estrutura HTML circular especificada pelo usuário.

import React, { useState, useRef, useEffect } from 'react';

// O componente ImagemUploader aceita:
// `initialPhotoUrl`: URL da foto de perfil existente para exibição inicial.
// `onUploadSuccess`: Função de callback chamada com a URL da imagem após upload bem-sucedido.
export default function ImagemUploader({ initialPhotoUrl = '', onUploadSuccess }) {
  // Estado para armazenar a URL da foto de perfil a ser exibida.
  // Inicializa com `initialPhotoUrl` ou uma string vazia.
  const [url_foto_perfil, setUrlFotoPerfil] = useState(initialPhotoUrl);
  // Estado para controlar o estado de carregamento durante o upload.
  const [uploading, setUploading] = useState(false);
  // Estado para exibir mensagens de status, erro ou sucesso.
  const [message, setMessage] = useState('');
  // Referência para o input de arquivo oculto, permitindo acioná-lo via clique no círculo.
  const fileInputRef = useRef(null);

  // Efeito para sincronizar `url_foto_perfil` com `initialPhotoUrl` se ela mudar de fora.
  useEffect(() => {
    if (initialPhotoUrl && initialPhotoUrl !== url_foto_perfil && !uploading) {
      setUrlFotoPerfil(initialPhotoUrl);
    }
  }, [initialPhotoUrl, url_foto_perfil, uploading]);

  /**
   * Aciona o clique no input de arquivo oculto quando o círculo é clicado.
   * Só permite clicar se não houver um upload em andamento.
   */
  const handleCircleClick = () => {
    if (!uploading) {
      fileInputRef.current.click();
    }
  };

  /**
   * Manipula a mudança no input de arquivo (quando um arquivo é selecionado).
   * Valida o arquivo e inicia o upload automaticamente.
   * @param {Object} e - O evento de mudança do input de arquivo.
   */
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setMessage(''); // Limpa mensagens anteriores.

    if (!file) {
      setMessage('Nenhuma imagem selecionada.');
      return;
    }

    // Validação básica do arquivo
    if (!file.type.startsWith('image/')) {
      setMessage('Por favor, selecione um arquivo de imagem válido.');
      return;
    }
    const MAX_FILE_SIZE_MB = 5; // Limite de 5MB
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setMessage(`O arquivo é muito grande. Tamanho máximo: ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    // Exibe uma pré-visualização temporária da imagem local antes do upload real.
    const tempUrl = URL.createObjectURL(file);
    setUrlFotoPerfil(tempUrl); // Atualiza a URL para a pré-visualização.

    // Inicia o processo de upload.
    setUploading(true);
    setMessage('Carregando imagem...');

    try {
         // --- Lógica para gerar um nome de arquivo único ---
      const originalFilename = file.name;
      const fileExtension = originalFilename.split('.').pop(); // Pega a extensão do arquivo
      // Combina timestamp, um pequeno string aleatório e a extensão para um nome único
      const uniqueIdentifier = Math.random().toString(36).substring(2, 8); // Gera 6 caracteres alfanuméricos
      const uniqueFilename = `${Date.now()}-${uniqueIdentifier}.${fileExtension}`;
      const filenameForUpload = encodeURIComponent(uniqueFilename); // Codifica para uso na URL
      // --- Fim da lógica de nome único ---
      const response = await fetch(`/api/upload?filename=${filenameForUpload}`, {
        method: 'POST',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Falha no upload: ${errorData.details || errorData.error || response.statusText}`);
      }

      const result = await response.json();
      const newImageUrl = result.url; // A URL final do Vercel Blob.

      // Revoga a URL temporária da pré-visualização para liberar memória.
      if (tempUrl) URL.revokeObjectURL(tempUrl);

      setUrlFotoPerfil(newImageUrl); // Atualiza para a URL permanente do Vercel Blob.
      setMessage('Upload de imagem concluído com sucesso!');

      // Chama o callback no componente pai com a nova URL.
      if (onUploadSuccess && typeof onUploadSuccess === 'function') {
        onUploadSuccess(newImageUrl);
      }

    } catch (error) {
      console.error('Erro no upload de imagem:', error);
      setMessage(`Erro ao carregar imagem: ${error.message}`);
      // Em caso de erro, reverte para a URL inicial ou limpa.
      // Dependendo do seu caso de uso, você pode querer manter a pré-visualização.
      // Aqui, voltamos para a URL inicial ou vazia.
      if (tempUrl) URL.revokeObjectURL(tempUrl); // Limpa a pré-visualização.
      setUrlFotoPerfil(initialPhotoUrl); // Volta para a foto inicial ou fica vazio.
    } finally {
      setUploading(false); // Finaliza o estado de carregamento.
      // Resetar o input para que o mesmo arquivo possa ser selecionado novamente (importante para onChange)
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex items-center space-x-6 p-4">
      {/* Círculo da Foto de Perfil - Mantendo sua estrutura HTML */}
      <div
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-indigo-500 cursor-pointer flex items-center justify-center bg-gray-700 shadow-lg transition-all duration-300 hover:border-indigo-400"
        onClick={handleCircleClick} // Usamos handleCircleClick para acionar o input oculto
      >
        {url_foto_perfil ? (
          // Se houver uma URL de foto de perfil, exibe a imagem
          <img
            src={url_foto_perfil}
            alt="Foto de Perfil"
            // Adicionado rounded-full aqui para garantir que a imagem interna seja circular
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          // Caso contrário, exibe o ícone da câmera
          <svg
            className="w-16 h-16 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 3 3 5-5V15z"
              clipRule="evenodd"
            ></path>
            <path
              fillRule="evenodd"
              d="M10 7a3 3 0 100 6 3 3 0 000-6z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}

        {/* Indicador de carregamento */}
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>

      {/* Input de arquivo escondido - Mantendo sua estrutura HTML */}
      <input
        type="file"
        accept="image/*" // Aceita apenas arquivos de imagem
        onChange={handleImageChange} // Chama a função de mudança de imagem (que inicia o upload)
        ref={fileInputRef} // Referência para acionar o clique programaticamente
        className="hidden" // Esconde o input
      />

     
    </div>
  );
}

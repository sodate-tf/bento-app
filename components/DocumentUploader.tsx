// src/components/DocumentUploader.tsx
"use client";

import React, { useState, ChangeEvent } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// Importa a instância do Firebase app inicializada a partir do seu arquivo.
// Certifique-se de que o caminho está correto para o seu projeto Next.js.
import { app } from '@/src/firebase/init'; // Ajuste este caminho se necessário

interface DocumentUploaderProps {
  // Prop opcional para definir o caminho de armazenamento dentro do bucket do Storage.
  // Por exemplo, 'documents/reports' ou 'user_files'.
  storagePath?: string;
  // Callback para retornar a URL do documento quando o upload for concluído com sucesso.
  onUploadSuccess?: (url: string) => void;
  // Callback para lidar com erros durante o upload.
  onUploadError?: (error: Error) => void;
  // Tipos de arquivo aceitos (ex: '.pdf,.doc,.docx,.txt'). Padrão para documentos comuns.
  acceptFileTypes?: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  storagePath = 'uploads/documents',
  onUploadSuccess,
  onUploadError,
  acceptFileTypes = '.pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx'
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);

  // Manipulador para quando um arquivo é selecionado
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      // Opcional: Adicionar verificação mais robusta de tipo de arquivo
      // Para fins de demonstração, o atributo `accept` no input já faz um bom trabalho.
      setFile(selectedFile);
      setError(null); // Limpa qualquer erro anterior
      setDocumentUrl(null); // Limpa a URL do documento anterior
      setUploadProgress(0); // Reseta o progresso
    }
  };

  // Função para lidar com o processo de upload
  const handleUpload = async () => {
    if (!file) {
      setError('Por favor, selecione um documento para fazer o upload.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // 1. Obtenha a instância do Firebase Storage.
      // A correção crucial: usa a instância 'app' importada.
      const storage = getStorage(app);

      // O __app_id é uma variável global fornecida no ambiente Canvas.
      // Se estiver fora do Canvas, você pode usar app.options.appId para obter o ID do projeto
      // ou um ID de aplicativo customizado para estruturar seus caminhos.
      const appId = (typeof window !== 'undefined' && typeof (window as any).__app_id !== 'undefined')
        ? (window as any).__app_id
        : (app.options.appId || 'default-app-id'); // Fallback para dev ou fora do Canvas

      // Cria a referência de armazenamento no Firebase Storage.
      // Estrutura o caminho para organizar os uploads: artifacts/{appId}/users/{userId}/{storagePath}/...
      // Para simplicidade e teste, usaremos um caminho mais genérico aqui.
      const fileName = `${Date.now()}-${file.name}`; // Evita sobrescrever arquivos com o mesmo nome
      const storageRef = ref(storage, `artifacts/${appId}/${storagePath}/${fileName}`);

      // Inicia o processo de upload resumível
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Monitora o progresso do upload
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (uploadError) => {
          // Lida com erros durante o upload
          console.error("Erro no upload:", uploadError);
          setError(`Erro ao fazer upload do documento: ${uploadError.message}`);
          setUploading(false);
          onUploadError?.(uploadError);
        },
        async () => {
          // Upload concluído com sucesso, obtém a URL para download
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setDocumentUrl(url);
          setUploading(false);
          setUploadProgress(100);
          console.log("Upload de documento concluído. URL:", url);
          onUploadSuccess?.(url); // Chama o callback de sucesso
        }
      );

    } catch (err: any) {
      console.error("Erro ao inicializar Storage ou fazer upload:", err);
      setError(`Erro no processo de upload: ${err.message}`);
      setUploading(false);
      onUploadError?.(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-inter">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload de Documento</h2>

        {/* Input de seleção de arquivo */}
        <div className="mb-6">
          <label htmlFor="file-input" className="block text-sm font-medium text-gray-700 mb-2">
            Selecione um Documento:
          </label>
          <input
            id="file-input"
            type="file"
            accept={acceptFileTypes} // Permite apenas tipos de arquivo especificados
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Exibição do nome do arquivo selecionado */}
        {file && (
          <p className="text-sm text-gray-600 mb-4">
            Arquivo selecionado: <span className="font-semibold">{file.name}</span>
          </p>
        )}

        {/* Botão de Upload */}
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition duration-300 ease-in-out ${
            !file || uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75'
          }`}
        >
          {uploading ? `Enviando... ${uploadProgress.toFixed(0)}%` : 'Fazer Upload do Documento'}
        </button>

        {/* Barra de progresso */}
        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {/* Mensagens de erro */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p className="font-medium">Erro:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Exibição da URL após o upload */}
        {documentUrl && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-green-600 mb-3">Upload Concluído!</p>
            <p className="text-sm text-gray-700 break-words">
              URL do Documento: <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{documentUrl}</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploader;

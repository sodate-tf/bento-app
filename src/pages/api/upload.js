// pages/api/upload.js
// Esta API Route é responsável por receber arquivos de imagem
// e fazer o upload para o Vercel Blob Storage.

// Importa as funções necessárias do SDK do Vercel Blob.
// `put` é usado para fazer o upload do arquivo.
import { put } from '@vercel/blob';
// `NextResponse` é usado para criar respostas HTTP no Next.js.
import { NextResponse } from 'next/server';

// Define a configuração para esta API Route.
// `config.runtime` define o ambiente de execução. 'edge' é leve e rápido.
// `config.api.bodyParser` é desabilitado porque precisamos ler o corpo da requisição
// como um stream de bytes para o upload de arquivos, em vez de JSON padrão.
export const config = {
  runtime: 'edge', // Usa o Edge Runtime para melhor desempenho
  api: {
    bodyParser: false, // Desabilita o body-parser padrão para lidar com streams
  },
};

/**
 * Função utilitária para converter um Stream para um Buffer.
 * Necessário porque o corpo da requisição pode vir como um ReadableStream.
 * @param {ReadableStream} readableStream - O stream a ser convertido.
 * @returns {Promise<Buffer>} - Um Buffer contendo os dados do stream.
 */
async function streamToBuffer(readableStream) {
  const chunks = [];
  // Cria um reader para ler o stream.
  const reader = readableStream.getReader();
  let done, value;
  // Loop para ler todos os chunks do stream.
  while (({ done, value } = await reader.read()) && !done) {
    chunks.push(value); // Adiciona cada chunk ao array.
  }
  // Concatena todos os chunks em um único Buffer.
  return Buffer.concat(chunks);
}

/**
 * Manipula as requisições POST para upload de arquivos.
 * @param {Request} request - O objeto da requisição HTTP.
 * @returns {Response} - O objeto da resposta HTTP.
 */
export default async function POST(request) {
  try {
    // Extrai o nome do arquivo da query string da URL.
    // Ex: /api/upload?filename=minha-imagem.jpg
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    // Verifica se o nome do arquivo foi fornecido.
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Lê o corpo da requisição como um ReadableStream.
    const fileStream = request.body;

    // Verifica se o corpo da requisição é válido.
    if (!fileStream) {
      return NextResponse.json({ error: 'Request body is empty or not a stream' }, { status: 400 });
    }

    // Converte o stream do arquivo para um Buffer.
    const fileBuffer = await streamToBuffer(fileStream);

    // Usa a função `put` do Vercel Blob para fazer o upload do arquivo.
    // `filename`: O nome do arquivo no storage.
    // `body`: O conteúdo do arquivo (Buffer ou Blob).
    // `access`: Define as permissões de acesso. 'public' significa que o arquivo será acessível via URL.
    const blob = await put(filename, fileBuffer, {
      access: 'public',
      // contentType: request.headers.get('Content-Type'), // Opcional: pode inferir do `fileBuffer` ou do cabeçalho do cliente
                                                         // mas geralmente o Vercel Blob infere corretamente.
    });

    // Retorna a URL e o pathname do arquivo carregado com sucesso.
    return NextResponse.json(blob);
  } catch (error) {
    console.error('Erro na API Route /api/upload:', error);
    // Em caso de erro, retorna uma resposta de erro 500 (Internal Server Error).
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

// Também pode ser útil para lidar com requisições OPTIONS (pré-voo CORS), embora o Vercel geralmente cuide disso.
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-File-Type',
    },
  });
}

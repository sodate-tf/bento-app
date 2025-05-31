// pages/api/random-photos.js
import fs from 'fs'; // Node.js File System module
import path from 'path'; // Node.js Path module

export default function handler(req, res) {
  // Caminho absoluto para a pasta de fotos dentro de 'public'
  const photosDirectory = path.join(process.cwd(), 'public', 'fotos-login');

  try {
    // Lê todos os nomes de arquivos na pasta
    const fileNames = fs.readdirSync(photosDirectory);

    // Filtra para garantir que sejam apenas arquivos de imagem (opcional, mas recomendado)
    const imageFiles = fileNames.filter(name => {
      const ext = path.extname(name).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    // Constrói os caminhos públicos para as imagens
    const imagePaths = imageFiles.map(name => `/fotos-login/${name}`);

    // Retorna a lista de caminhos das imagens
    res.status(200).json({ success: true, images: imagePaths });
  } catch (error) {
    console.error('Erro ao ler a pasta de fotos:', error);
    res.status(500).json({ success: false, message: 'Não foi possível carregar as fotos.' });
  }
}
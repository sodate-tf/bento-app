// app/api/random-photos/route.js
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server'; // Importe para usar NextResponse

export async function GET() {
  const photosDirectory = path.join(process.cwd(), 'public', 'fotos-login');

  try {
    const fileNames = fs.readdirSync(photosDirectory);

    const imageFiles = fileNames.filter(name => {
      const ext = path.extname(name).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    const imagePaths = imageFiles.map(name => `/fotos-login/${name}`);

    return NextResponse.json({ success: true, images: imagePaths });
  } catch (error) {
    console.error('Erro ao ler a pasta de fotos:', error);
    return NextResponse.json(
      { success: false, message: 'Não foi possível carregar as fotos.' },
      { status: 500 }
    );
  }
}
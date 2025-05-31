import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com', // <--- ADICIONE ESTE DOMÍNIO AQUI
      // Adicione outros domínios de imagem externos que você usa no seu projeto, se houver
      // Ex: 'another-external-image-provider.com',
      // 'example.com',
    ]
  }
};

export default nextConfig;

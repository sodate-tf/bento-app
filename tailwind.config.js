// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',      // Seus arquivos de página
    './src/components/**/*.{js,ts,jsx,tsx}', // Seus componentes
  ],
  darkMode: 'class', // Ou 'media' ou 'class'

  theme: {
    extend: {
      scrollBehavior: {
        smooth: 'smooth',
      },
    },
  },
  plugins: [],
};

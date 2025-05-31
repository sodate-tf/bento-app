// src/pages/_app.tsx

import "../styles/globals.css";
import type { AppProps } from "next/app";

// Importe AuthProvider como uma exportação NOMEADA
import { AuthProvider } from "../data/context/AuthContext";
// ... (seus outros imports, como AppProvider)

export default function App({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
      {/* Certifique-se de que AuthProvider envolve toda a aplicação */}
      {/* Se você tiver AppProvider, ele pode estar dentro ou fora do AuthProvider,
          dependendo da dependência dos contextos. Geralmente AuthProvider é mais externo. */}
      {/* <AppProvider> */}
        <Component {...pageProps} />
      {/* </AppProvider> */}
    </AuthProvider>
  );
}
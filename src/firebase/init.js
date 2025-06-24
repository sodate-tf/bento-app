// src/firebase/init.js

// Importações MODULARES do Firebase SDK v9+
import { initializeApp, getApps, getApp } from "firebase/app"; // Para inicializar o app Firebase
import { getAuth } from "firebase/auth"; // Para o serviço de autenticação
import { getFirestore } from "firebase/firestore"; // Para o Firestore (se estiver usando)
import { getStorage } from "firebase/storage"; // Para o Firebase Storage (conforme nossa conversa anterior)

// Seu objeto de configuração do Firebase
// Certifique-se de que este objeto esteja definido ou seja importado de outro local.
// Exemplo:
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
};

// Inicializa o Firebase App apenas uma vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Obtém as instâncias dos serviços do Firebase
const auth = getAuth(app);
const db = getFirestore(app); // Se estiver usando Firestore
const storage = getStorage(app); // Se estiver usando Firebase Storage

// Exporta as instâncias para serem usadas em outros lugares da sua aplicação
export { app, auth, db, storage };

// Opcional: Se você precisa definir __app_id globalmente para algum motivo específico
// window.__app_id = firebaseConfig.appId;
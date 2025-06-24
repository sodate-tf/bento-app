"use client"; // Marca este componente como um Client Component no Next.js

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Use useRouter para roteamento no Next.js
import Cookies from 'js-cookie';

// Importações MODULARES do Firebase Authentication
import {
    Auth, // Tipo para a instância de Auth
    User as FirebaseUser, // Renomeia User para evitar conflito com seu Usuario
    onIdTokenChanged,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

// Importe suas instâncias de auth e db do seu arquivo init.js modular
// Certifique-se de que 'auth' e 'db' são exportados nomeadamente de '@/src/firebase/init'
import { auth, db } from '@/src/firebase/init'; 

import Usuario from '@/src/model/Usuario'; // Seu tipo de usuário


interface AuthContextProps {
    usuario?: Usuario;
    carregando?: boolean;
    loginGoogle?: () => Promise<void>;
    login?: (email: string, senha: string) => Promise<void>;
    cadastrar?: (email: string, senha: string) => Promise<void>;
    logout?: () => Promise<void>;
}

// Crie o contexto com um valor inicial vazio (ou um valor padrão mais completo, se preferir)
const AuthContext = createContext<AuthContextProps>({});

// Função para normalizar o usuário do Firebase para o seu tipo Usuario
async function usuarioNormalizado(usuarioFirebase: FirebaseUser): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken();
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName || null, // displayName pode ser null
        email: usuarioFirebase.email || null, // email pode ser null
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId || null, // providerId pode ser null
        imageUrl: usuarioFirebase.photoURL || null // photoURL pode ser null
    };
}

// Função para gerenciar o cookie de autenticação
function gerenciarCookie(logado: boolean) {
    if (logado) {
        // Use um nome mais específico para o cookie para evitar conflitos se tiver outros apps
        Cookies.set('bento-app-auth-token', 'true', {
            expires: 7, // Expira em 7 dias
            secure: process.env.NODE_ENV === 'production', // Apenas em HTTPS em produção
            sameSite: 'Lax', // Previne CSRF
        });
    } else {
        Cookies.remove('bento-app-auth-token');
    }
}

// Provedor de Autenticação
export function AuthProvider(props: React.PropsWithChildren<{}>) { // Tipagem correta para props
    const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);
    const [carregando, setCarregando] = useState(true);
    const router = useRouter(); // Use o hook useRouter para navegação

    // Função para configurar a sessão do usuário após login/cadastro/mudança de estado
    async function configurarSessao(usuarioFirebase: FirebaseUser | null) {
        if (usuarioFirebase) {
            console.log("Usuário Firebase recebido:", usuarioFirebase.uid, usuarioFirebase.email);
            const usuarioNormalizadoData = await usuarioNormalizado(usuarioFirebase);
            setUsuario(usuarioNormalizadoData);
            gerenciarCookie(true);
            console.log("Sessão configurada para o usuário:", usuarioNormalizadoData.email);
            return usuarioNormalizadoData.email;
        } else {
            console.log("Usuário deslogado ou nulo.");
            setUsuario(undefined);
            gerenciarCookie(false);
            // Redireciona para a página de login se não houver usuário logado e não estiver na tela de login
            if (router.pathname !== '/autenticacao') { // Ajuste '/autenticacao' para a rota da sua página de login
                 router.push('/autenticacao'); // Redireciona para a página de login
            }
            return false;
        }
    }

    // Login com Google
    async function loginGoogle() {
        setCarregando(true);
        try {
            const provider = new GoogleAuthProvider(); // Instancia o provedor do Google
            const resp = await signInWithPopup(auth as Auth, provider); // Usa signInWithPopup do auth modular
            await configurarSessao(resp.user);
            router.push('/'); // Redireciona para a página inicial
        } catch (error: any) {
            console.error("Erro no login com Google:", error);
            // Lidar com erros de forma mais específica, ex: exibir uma mensagem para o usuário
            // throw error; // Pode relançar o erro se o componente chamador precisar tratá-lo
        } finally {
            setCarregando(false);
        }
    }

    // Cadastrar com Email e Senha
    async function cadastrar(email: string, senha: string) {
        setCarregando(true);
        try {
            const resp = await createUserWithEmailAndPassword(auth as Auth, email, senha); // Usa createUserWithEmailAndPassword modular
            await configurarSessao(resp.user);
            router.push('/');
        } catch (error: any) {
            console.error("Erro no cadastro:", error);
            // Lidar com erros específicos (e-mail já em uso, senha fraca, etc.)
            // throw error;
        } finally {
            setCarregando(false);
        }
    }

    // Login com Email e Senha
    async function login(email: string, senha: string) {
        setCarregando(true);
        try {
            const resp = await signInWithEmailAndPassword(auth as Auth, email, senha); // Usa signInWithEmailAndPassword modular
            await configurarSessao(resp.user);
            router.push('/');
        } catch (error: any) {
            console.error("Erro no login:", error);
            // Lidar com erros específicos (usuário não encontrado, senha incorreta, etc.)
            // throw error;
        } finally {
            setCarregando(false);
        }
    }

    // Logout
    async function logout() {
        setCarregando(true);
        try {
            await signOut(auth as Auth); // Usa signOut modular
            await configurarSessao(null); // Limpa a sessão
            router.push('/autenticacao'); // Redireciona para a página de login após o logout
        } catch (error: any) {
            console.error("Erro no logout:", error);
            // throw error;
        } finally {
            setCarregando(false);
        }
    }

    // Efeito para observar mudanças no estado de autenticação do Firebase
    useEffect(() => {
        // Verifica se o cookie de sessão existe. Se sim, assume que o usuário estava logado.
        // Se não, configura o carregando para false imediatamente.
        if (Cookies.get('bento-app-auth-token')) {
            console.log("Cookie de autenticação encontrado. Observando estado do Firebase...");
            // onIdTokenChanged é preferível a onAuthStateChanged para garantir que o token está atualizado
            const unsubscribe = onIdTokenChanged(auth as Auth, async (user) => {
                await configurarSessao(user);
                setCarregando(false); // Apenas após a primeira configuração, o carregamento termina
            });
            return () => unsubscribe(); // Limpeza do listener
        } else {
            console.log("Cookie de autenticação não encontrado. Usuário deslogado.");
            setCarregando(false);
            setUsuario(undefined); // Garante que o usuário esteja undefined
            // Redireciona para a página de login se não houver cookie
            if (router.pathname !== '/autenticacao') {
                router.push('/autenticacao');
            }
        }
    }, [auth, router]); // Dependências: auth e router

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            loginGoogle,
            login,
            logout,
            cadastrar
        }}>
            {/* Se estiver carregando e não houver usuário, você pode exibir um spinner aqui */}
            {carregando ? (
                <div className="flex items-center justify-center min-h-screen">
                    {/* <SeuComponenteDeLoading /> ou um simples texto */}
                    <p>Carregando autenticação...</p>
                </div>
            ) : (
                props.children
            )}
        </AuthContext.Provider>
    );
}

// Exporta o AuthContext para que outros componentes possam consumi-lo
export default AuthContext;

// Exemplo de como usar em um componente:
// import React, { useContext } from 'react';
// import AuthContext from '@/src/context/AuthContext';
//
// function MeuComponente() {
//   const { usuario, carregando, logout } = useContext(AuthContext);
//
//   if (carregando) {
//     return <p>Carregando...</p>;
//   }
//
//   if (!usuario) {
//     return <p>Por favor, faça login.</p>;
//   }
//
//   return (
//     <div>
//       <p>Bem-vindo, {usuario.nome || usuario.email}!</p>
//       <button onClick={logout}>Sair</button>
//     </div>
//   );
// }

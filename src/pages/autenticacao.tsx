"use client"; // Marca este componente como um Client Component no Next.js

import AuthInput from "@/components/auth/AuthInput";
import FotoAleatoria from "@/components/FotoAleatoria";
// Presumi que 'Google' e 'IconeExclamacao' são componentes React
import { Google, IconeExclamacao } from "@/components/icons";
import Logo from "@/components/template/Logo";
import { useState } from "react";
// O caminho para useAuth é relativo, certifique-se de que está correto
import useAuth from "../data/hook/useAuth"; 
import { FirebaseError } from "firebase/app"; // Importe o tipo FirebaseError


export default function Autenticacao(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState<string | null>(null); // Pode ser null ou string
    const [modo, setModo] = useState<'login' | 'cadastro'>('login');
    // Desestrutura os métodos do useAuth, que agora são garantidos pelo AuthContext
    const { cadastrar, login, loginGoogle } = useAuth();

    // Função melhorada para exibir erros
    function exibirErro(msg: string) {
        setErro(msg);
        setTimeout(() => setErro(null), 5000); // Limpa o erro após 5 segundos
    }

    function alterarModo() {
        // console.log("Modo atual:", modo); // Remova console.log de produção
        setModo(modo === 'login' ? 'cadastro' : 'login');
        setErro(null); // Limpa o erro ao trocar de modo
    }

    async function submeter() {
        setErro(null); // Limpa erros anteriores ao tentar submeter novamente
        try {
            if (modo === 'login') {
                // login já é garantido por useAuth, não precisa de 'if (login)'
                await login?.(email, senha); // Usa optional chaining para segurança, embora o contexto garanta a existência
            } else { // modo === 'cadastro'
                // cadastrar já é garantido por useAuth, não precisa de 'if (cadastrar)'
                await cadastrar?.(email, senha); // Usa optional chaining
            }
        } catch (e: any) { // Captura o erro, tipando como 'any' para flexibilidade
            // Verifique se o erro é uma instância de FirebaseError para extrair a mensagem
            if (e instanceof FirebaseError) {
                switch (e.code) {
                    case 'auth/email-already-in-use':
                        exibirErro('Este e-mail já está em uso. Tente outro ou faça login.');
                        break;
                    case 'auth/invalid-email':
                        exibirErro('O formato do e-mail é inválido.');
                        break;
                    case 'auth/weak-password':
                        exibirErro('A senha deve ter pelo menos 6 caracteres.');
                        break;
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        exibirErro('Credenciais inválidas. Verifique seu e-mail e senha.');
                        break;
                    case 'auth/popup-closed-by-user':
                        exibirErro('Login com Google cancelado pelo usuário.');
                        break;
                    default:
                        // Para outros erros Firebase não específicos ou erros genéricos
                        exibirErro(`Erro: ${e.message || 'Ocorreu um erro inesperado.'}`);
                        break;
                }
            } else {
                // Para erros não-Firebase
                exibirErro(`Erro inesperado: ${e.message || String(e)}`);
            }
        }
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100"> {/* Adicione um bg para o container */}
            {/* Foto Aleatória, visível apenas em telas maiores */}
            <div className="w-1/2 h-full hidden md:block lg:w-2/3">
                <FotoAleatoria />
            </div>

            {/* Formulário de Autenticação */}
            <div className="md:w-1/2 w-full m-4 md:m-10 lg:w-1/3 p-6 bg-white shadow-lg rounded-lg"> {/* Adicione padding e sombra */}
                <div className="flex flex-col h-full justify-between"> {/* Use justify-between para espaçar */}
                    {/* Cabeçalho com Logo */}
                    <div className="flex flex-col items-center justify-center mb-8"> {/* Ajuste margin-bottom */}
                        <Logo altura={100} largura={100} />
                        <h1 className={`text-3xl font-extrabold text-gray-800 mt-4`}>
                            {modo === 'login' ? 'Entre com sua conta' : 'Faça seu cadastro'}
                        </h1>
                    </div>

                    {/* Exibição de Erro */}
                    {erro && ( // Renderiza apenas se 'erro' tiver um valor
                        <div className="flex items-center bg-red-500 text-white py-3 px-5 my-4 border border-red-700 rounded-lg animate-fade-in"> {/* Ajuste cores e adicione animação */}
                            {/* Ajuste o tamanho do IconeExclamacao se necessário */}
                            {IconeExclamacao && <span className="mr-3">{IconeExclamacao}</span>} {/* Adicione espaço à direita */}
                            <span>{erro}</span>
                        </div>
                    )}

                    {/* Campos de Input */}
                    <AuthInput
                        obrigatorio={true}
                        tipo="email"
                        label="Email"
                        valor={email}
                        valorMudou={setEmail}
                    />
                    <AuthInput
                        obrigatorio={true}
                        tipo="password"
                        label="Senha"
                        valor={senha}
                        valorMudou={setSenha}
                        className="mt-4" // Adiciona margem entre os inputs
                    />
                    
                    {/* Botão de Submissão */}
                    <button
                        onClick={submeter}
                        className={`w-full cursor-pointer bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg px-4 py-3 mt-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50`}
                    >
                        {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                    </button>

                    <hr className="my-6 border-gray-300 w-full" />

                    {/* Botão de Login com Google */}
                    <button
                        onClick={loginGoogle}
                        className={`w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-3 relative flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`}
                    >
                        {/* Ajuste do ícone Google: envolva-o para melhor posicionamento */}
                        {Google && <span className="absolute left-4">{Google}</span>} {/* Posiciona o ícone à esquerda */}
                        Entrar com Google
                    </button>

                    {/* Alternar Modo (Login/Cadastro) */}
                    {modo === 'login' ? (
                        <p className="mt-8 text-center text-gray-700">
                            Novo por aqui?{' '}
                            <a
                                onClick={alterarModo}
                                className={`text-blue-600 hover:text-blue-800 font-semibold cursor-pointer transition-colors duration-200`}
                            >
                                Crie uma conta
                            </a>
                        </p>
                    ) : (
                        <p className="mt-8 text-center text-gray-700">
                            Já tem cadastro?{' '}
                            <a
                                onClick={alterarModo}
                                className={`text-blue-600 hover:text-blue-800 font-semibold cursor-pointer transition-colors duration-200`}
                            >
                                Entre com suas credenciais
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

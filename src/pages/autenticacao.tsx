import AuthInput from "@/components/auth/AuthInput";
import FotoAleatoria from "@/components/FotoAleatoria";
import { Google, IconeExclamacao } from "@/components/icons";
import Logo from "@/components/template/Logo";
import { useState } from "react";
import useAuth from "../data/hook/useAuth";


export default function Autenticacao(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const {cadastrar, login, loginGoogle} = useAuth()

    function exibirErro(msg: string){
        setErro(msg)
        setTimeout(() => setErro(''), 5000)
    }
    function alterarModo()
    {
        console.log(modo)
        if (modo === 'login')
            setModo('cadastro')
            else
            setModo('login')
    }
   async function submeter(){
        try{
            if (modo === 'login' && login){
               await login(email, senha)
            }
            else{
                if(cadastrar)
                    await cadastrar(email, senha)
            }
        } catch(e){
            exibirErro(""+e)
        }
        
    }
    return(
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="w-1/2 h-full hidden md:block lg:w-2/3 ">
              <FotoAleatoria />
            </div>
            <div className="md:w-1/2 w-full m-10 lg:w-1/3">
                <div className="flex flex-col h-screen">
                    <div className="flex flex-col items-center justify-center">
                        <Logo altura={100} largura={100}/>
                     </div>
                    <h1 className={`text-xl font-bold mb-5 `}>{modo === 'login' ? 'Entre com sua conta' : 'Faça seu cadastro'}</h1>
                    {erro ? (
                      <div className="flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg">
                        {IconeExclamacao}
                        <span className="ml-3">{erro}</span>
                    </div>
                    ) : false}
                 
                    <AuthInput obrigatorio={true} tipo="email" label="Email" valor={email} valorMudou={setEmail} />
                    <AuthInput obrigatorio={true} tipo="password" label="Senha" valor={senha} valorMudou={setSenha} />
                    <button onClick={() => submeter()} className={`w-full bg-indigo-500 hover:bg-indigo-400 text-shadow-white rounded-lg px-4 py-3 mt-6`}>
                        {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                    </button>

                    <hr className="my-6 border-gray-300 w-full" />

                    <button onClick={loginGoogle} className={`w-full bg-red-500 hover:bg-red-400 text-shadow-white rounded-lg px-4 py-3 relative`}>
                    {Google} Entrar com Google
                    </button>
                    {modo ==='login' ? (
                        <p className="mt-8">  Novo por aqui? 
                            <a onClick={() => alterarModo()} className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}> Crie uma conta</a>
                        </p>
                    ) : (
                        <p className="mt-8"> Já tem cadastro? 
                            <a onClick={() => alterarModo()} className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}> Entre com suas credenciais</a>
                        </p>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
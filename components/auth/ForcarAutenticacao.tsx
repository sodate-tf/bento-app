import Image from "next/image"
import loading from "../../public/loading.gif"
import useAuth from "@/src/data/hook/useAuth"
import  rota from "next/router"
import Head from "next/head"
interface ForcarAutenticacaoProps{
   children: React.ReactNode
}
export default function ForcarAutenticacao(props: ForcarAutenticacaoProps){
    const {usuario, carregando} = useAuth()
    function renderizarConteudo(){
        return(
            <>
            <Head>
                <script 
                   dangerouslySetInnerHTML={{
                     __html: `if(!document.cookie?.includes("admin-templete-bento-auth")){
                                    window.location.href = "/autenticacao"
                     }`
                   }}
                />   
            </Head>
               {props.children}
            </>
        )
    }
    function renderizarCarregando(){
        return(
            <div className={`flex justify-center items-center h-screen`}>
                <Image src={loading} alt="Carregando"/>
            </div>
        )
    }


    if (!carregando && usuario?.email){
        return(
            renderizarConteudo()
        )
    } else if(carregando){
        renderizarCarregando()
    } else{
        rota.push('/autenticacao')
        return null
    }
}
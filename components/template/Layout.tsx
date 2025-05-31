import useAppData from "@/src/data/hook/useAppData"
import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import AlterarTema from "./AlterarTema"
import MenuLateral from "./MenuLateral"
import ForcarAutenticacao from "../auth/ForcarAutenticacao"

interface LayoutPros{
    titulo: string
    subTitulo: string
    children?: React.ReactNode
}
export default function Layout(props: LayoutPros){
const dados = useAppData()
    return(
        <ForcarAutenticacao>
        <div className={`flex h-screen w-screen ${dados.tema}`}>
            <AlterarTema />
             <MenuLateral />
             <div className={`flex flex-col w-full p-7 bg-gray-300 dark:bg-gray-800`}>
                <Cabecalho titulo={props.titulo} subtitulo={props.subTitulo} />
                <Conteudo>
                    {props.children}
                </Conteudo>
             </div>
        </div>
        </ForcarAutenticacao>
    )
} 
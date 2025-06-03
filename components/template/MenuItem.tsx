import Link from "next/link"
interface MenuItemProps{
    url?: string
    texto: string
    icone: React.ReactElement
    onClick?: (evento: React.MouseEvent<HTMLElement>) => void 
    className?: string
}
export default  function MenuItem(props: MenuItemProps){
    
    function renderizarConteudo(link: boolean){
            if (link && props.url){
                return(
                <li className={`hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${props.className}`} onClick={props.onClick}>
                    <Link href={props.url} className={`flex flex-col justify-center items-center w-full h-20 dark:text-gray-200  ${props.className}`}>
                        {props.icone}
                        <span className={`text-xs font-light text-gray-600 w-20 text-center dark:text-gray-200 ${props.className}`}>{props.texto}</span>
                    </Link>
                </li>
                )
            }
            else{
                return(
                <li className={`${props.className}`}>
                    <Link href="" onClick={props.onClick} className={`flex flex-col justify-center items-center w-full h-20 `}>
                        { props.icone}
                        <span className={`text-xs font-light text-gray-600 w-20 ${props.className} text-center`}>{props.texto}</span>
                    </Link>
                </li>
                )
            }        
    }

    return(
            props.url ? renderizarConteudo(true) : renderizarConteudo(false)
    )
}

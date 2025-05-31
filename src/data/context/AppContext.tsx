import { createContext, ReactNode, useEffect, useState } from "react";
interface appContextProps{
    tema?: string
    alternarTema?: () => void
    children?: ReactNode
}
const appContext =  createContext<appContextProps>({})

export function AppProvider(props: appContextProps){
    const [tema, setTema] = useState('')

    useEffect(() =>{
   const temaSalvo =  localStorage.getItem('tema')
        setTema(temaSalvo || '')
    }, [])

    function alternarTema(){
       if(tema === '')
        {
        setTema('dark')
        localStorage.setItem('tema', 'dark')
       }
       else{
        setTema('')
        localStorage.setItem('tema', '')
       }
    }
    return(
        <appContext.Provider value={{
            tema: tema,
            alternarTema
        }}>
        {props.children}
        </appContext.Provider>
    )
}
export default appContext
export const AppConsumer = appContext.Consumer
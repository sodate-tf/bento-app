import ReactInputMask from "react-input-mask";
interface CepProps{
    cep: string
    pesquisarEndereco: () => void
    setCep: (valor: string) => void

}
export default function Cep(props: CepProps){
    return(
        <ReactInputMask
                mask="99999-999"
                value={props.cep}
                onChange={(e) => props.setCep(e.target.value)}
                onBlur={props.pesquisarEndereco}
                placeholder="_____-___"
                className="flex bg-gray-50 w-[120px] p-1 text-base text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
    )
}
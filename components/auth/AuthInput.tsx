interface AuthInputProps{
    label: string
    valor: string
    valorMudou: (novoValor: string) => void
    tipo: 'text' | 'email' | 'password'
    obrigatorio: boolean
    naoRenderizarQuando?: boolean
}
export default function AuthInput(props: AuthInputProps){
    return props.naoRenderizarQuando ? null : (
        <div className="flex flex-col mt-4">
            <label>{props.label}</label>
            <input type={props.tipo} required={props.obrigatorio} onChange={e => props.valorMudou?.(e.target.value)} value={props.valor} name="" id="" 
            className={`px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white`}
            />
        </div>
    )
}
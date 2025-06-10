import ReactInputMask from "react-input-mask";
interface CelularProps{
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}
export default function Celular(props: CelularProps){
    return(
        <ReactInputMask id="celular"
                     value={props.value}
                     onChange={props.onChange}
                      name="celular"
                      mask="(99) 99999-9999"
                      placeholder="(__) _____-____"
                      className="flex bg-gray-50 w-40 p-1 text-base text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" />
    )
}
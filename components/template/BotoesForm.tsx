import { IconeCheck, IconeX } from "../icons";
import { Button } from "../ui/button";

export interface BotoesFormProps{
    clickCancelar: () => void
}
export default function BotoesForms(props: BotoesFormProps){
    return(
        <div className="flex justify-end items-end mt-7">
            <Button className="bg-cyan-950">
                {IconeCheck} Gravar
            </Button>
                <Button className="ml-3 bg-rose-950" onClick={props.clickCancelar}>
                {IconeX} Cancelar
            </Button>
        </div>
    )
}
import { IconeCheck, IconeX } from "../icons";
import { Button } from "../ui/button";

export default function BotoesForms(){
    return(
        <div className="flex justify-end items-end mt-7">
            <Button className="bg-cyan-950">
                {IconeCheck} Gravar
            </Button>
                <Button className="ml-3 bg-rose-950">
                {IconeX} Cancelar
            </Button>
        </div>
    )
}
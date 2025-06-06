import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Printer } from "lucide-react";

interface ImprimirFichasProps{
    uid: string
}
export default function ImprimirFicha(props : ImprimirFichasProps){
    return(
        <div className="flex mt-3">
            <Tooltip>
                <TooltipTrigger>
                    <Printer className="text-cyan-950 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent side="right" >
                    <p>Imprimir Ficha</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}
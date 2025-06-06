import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { NotebookPen } from "lucide-react"
import { useState } from "react"
import ImprimirFicha from "./ImprimirFicha"
import AcampamentoEquipe from "./AcampamentoEquipe"
import ConvidarEquipe from "./ConvidarEquipe"
import HistoricoEquipes from "./HistoricoEquipes"

interface EditarHistoricoProps{
    uid: string
}
export default function EditarHistorico(props: EditarHistoricoProps){
    const [exibirConvite, setExibirConvite] = useState(false)

    function mostrarConvite(exibir: boolean){
        setExibirConvite(exibir)
    }
    
    return(
        <aside>
              <Sheet>
                <SheetTrigger>
                    <div className="absolute top-5 right-5">
                        <Tooltip>
                            <TooltipTrigger>
                                 <NotebookPen className="text-cyan-950 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" >
                                <p>Editar Histórico</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </SheetTrigger>
                <SheetContent className="border-2 border-red-950 inset-shadow-xl inset-ring-red-950">
                    <SheetHeader>
                        <SheetTitle>Histórico e ações:</SheetTitle>
                        <SheetDescription>
                            <ImprimirFicha uid={props.uid} />
                            <Separator className="mt-3" />
                            <AcampamentoEquipe uid={props.uid}/>
                            <Separator className="mt-3" />
                            <ConvidarEquipe uid={props.uid} exibirConvite={() => mostrarConvite} />
                            <Separator className="mt-3" />
                            <HistoricoEquipes uid={props.uid} exibirConvite={exibirConvite}/>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
              </Sheet>
              
            </aside>
    )
}
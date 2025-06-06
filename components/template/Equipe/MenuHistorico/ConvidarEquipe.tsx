import { AlertDialog,  AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { ScrollText } from "lucide-react"
import { useState } from "react"

interface ConvidarEquipeProps{
    uid: string
    exibirConvite: (exibir: boolean) => void
}
export default function ConvidarEquipe(props: ConvidarEquipeProps){
    function setarPendente(){
        props.exibirConvite(true)
    }
    const acampasAtivos = ['XV Acampabento', 'II Bento 30+']
    const [ativoSelecionado, setAtivoSelecionado] = useState(acampasAtivos[0])
    return(
        <div className="mt-3 flex flex-col">
            <div className="flex">
                <Label className="text-xs">Convidar para Equipe:</Label>
            </div>
            <div className="mt-2 mr-2 flex">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex">
                            {ativoSelecionado}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {acampasAtivos.map((acampaAtivo, i) =>(
                            <DropdownMenuCheckboxItem
                            key={i}
                            className="capitalize"
                            checked={acampaAtivo === ativoSelecionado}
                            onCheckedChange={(value) => {
                                    setAtivoSelecionado(acampaAtivo)
                                }}    
                        >
                        {acampaAtivo}    
                        </DropdownMenuCheckboxItem>   
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="outline" className="ml-2 bg-cyan-950 font-light hover:cursor-pointer hover:text-white hover:bg-cyan-800 text-white text-xs">
                            <ScrollText size={16} strokeWidth={1} className="text-white" />
                            Enviar Convite
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Confirma o envio do convite?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ao clicar em continuar será enviada a notifcação de convite
                            para trabahar no acampamento.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel className="bg-red-950 hover:bg-red-900 cursor-pointer hover:text-white text-white">Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="bg-cyan-950 hover:bg-cyan-900 cursor-pointer hover:text-white text-white"
                            onClick={setarPendente}
                        >Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                
            </div> 
        </div>
    )
}
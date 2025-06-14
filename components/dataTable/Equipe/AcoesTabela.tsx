import { IconeCheck } from "@/components/icons";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { exibirMsgAlerta } from "@/lib/utils";
import Link from "next/link";


interface AcoesTabelaProps{
    uid: string
}
export default function AcoesTabela(props: AcoesTabelaProps){
    function copiarLinkInscricao(){
       exibirMsgAlerta("Link copiado com sucesso!", "Sucesso", IconeCheck)
    }
    return(
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={copiarLinkInscricao}>
                Link do Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link href={"/equipe/"+props.uid}>
                    Editar membro
                 </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}

function exibirAlerta() {
    throw new Error("Function not implemented.");
}

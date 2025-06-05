import { IconeCheck } from "@/components/icons";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";

interface AcoesTabelaProps{
    uid: string
}
export default function AcoesTabela(props: AcoesTabelaProps){
    function copiarLinkInscricao(){
       toast("Link copiado com sucesso!", {
        className: "bg-cyan-900 text-white shadow-lg p-10 flex",
        unstyled: true,
        invert: false,
        icon: IconeCheck
       })
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
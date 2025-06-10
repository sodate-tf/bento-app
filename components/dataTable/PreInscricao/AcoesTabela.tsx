import { IconeCheck } from "@/components/icons";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { generateWhatsAppLink } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

interface AcoesTabelaProps{
    uid: string, 
    celular: string,
    nome: string
}
export default function AcoesTabela(props: AcoesTabelaProps){
    const msgWhataspp = `🎉 Parabéns, ${props.nome}! Sua inscrição no Acampamento Bento foi um sucesso! 
                        Você deu o primeiro grande passo para garantir sua vaga. 
                        Faltam só algumas etapas para a sua jornada começar, 
                        e em breve enviaremos os próximos passos. 
                        Estamos muito animados com você! ✨`
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
               <Link href={"/acampabento/perfil/"+props.uid} target="_blank"> 
                    Link do Perfil
               </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <a target="_blank" href={generateWhatsAppLink(props.celular, msgWhataspp)}>
                   Enviar Mensagem de Primeiro contato
                </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href={"/perfil/"+props.uid} target="_blank">
                    Editar Perfil
                 </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}
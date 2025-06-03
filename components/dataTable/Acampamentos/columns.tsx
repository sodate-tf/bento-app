"use client"
import {ColumnDef} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast, Toaster, useSonner } from "sonner"
import { IconeCheck } from "@/components/icons"

export type Acampamento = {
    uid?: string
    nome: string
    dataInicio: Date
    dataFinal: Date
}

function copiarLinkInscricao(){
   toast("Link copiado com sucesso!", {
    className: "bg-cyan-900 text-white shadow-lg p-10 flex",
    unstyled: true,
    invert: false,
    icon: IconeCheck
   })
}
export const columns: ColumnDef<Acampamento>[] = [
{
    accessorKey: "uid",
    header: "Uid",

},
{
    accessorKey: "nome",
    header: ({column}) =>{
        return (
            <Button
               variant="ghost"
               onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} >
                Nome
                <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
               </Button>
        )
    },
},
{
    accessorKey: "dataInicio",
    header:"Data Início",
        cell: ({ row }) => {
        // Formata a data para exibição, pois 'dataInicio' é um objeto Date
        return row.original.dataInicio.toLocaleDateString('pt-BR');
    },
},
{
    accessorKey: "dataFinal",
    header: "Data Final",
    cell: ({ row }) => {
        // Formata a data para exibição, pois 'dataFinal' é um objeto Date
        return row.original.dataFinal.toLocaleDateString('pt-BR');
    },
},
{
    id: "Ação",
    cell:({row}) =>{
        const acampa = row.original
        return(
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir Menu</span>
                        <MoreHorizontal className="h-4 w-4"></MoreHorizontal>
                     </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem onClick={copiarLinkInscricao}>
                        Link de Inscrição Campistas
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Editar Acampamento</DropdownMenuItem>
                    <DropdownMenuItem>Visualizar Relatório Geral</DropdownMenuItem>
                </DropdownMenuContent>
                
            </DropdownMenu>
        )
    }
}
]
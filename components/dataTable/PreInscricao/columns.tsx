"use client"
import {ColumnDef} from "@tanstack/react-table"
import { ArrowUpDown, Hourglass } from "lucide-react"
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
import AcoesTabela from "./AcoesTabela"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export type PreInscricao = {
    uidCampista: string
    nome: string
    celular: string
    dataNascimento: Date,
    status: boolean
}

export const columns: ColumnDef<PreInscricao>[] = [
{
    accessorKey: "uid",
    header: "UID",
    cell: ({ row }) => {
        return row.original.uidCampista;
    },
},
{
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        return row.original.status ? '' : (
            <Tooltip>
                <TooltipTrigger asChild>
                     <Hourglass  className="text-orange-800" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Contato Pendente</p>
                </TooltipContent>
                </Tooltip>
           
        );
    },
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
    accessorKey: "celular",
    header: "CELULAR",
    cell: ({ row }) => {
        // Formata a data para exibição, pois 'dataFinal' é um objeto Date
        return row.original.celular;
    },
},
{
    accessorKey: "dataNascimento",
    header: "DATA NASCIMENTO",
    cell: ({ row }) => {
        // Formata a data para exibição, pois 'dataFinal' é um objeto Date
        return row.original.dataNascimento.toLocaleDateString('pt-BR');;
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
                <AcoesTabela uid={acampa.uidCampista || ""} nome={acampa.nome} celular={acampa.celular}/>
            </DropdownMenu>
        )
    }
}
]
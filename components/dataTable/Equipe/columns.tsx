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
import AcoesTabela from "./AcoesTabela"
import { Checkbox } from "@/components/ui/checkbox"

export type Equipe = {
    uid?: string
    nome: string
    cpf?: string
    celular: string
    dataNascimento: Date
    mostraCheck: boolean
}

export const columns: ColumnDef<Equipe>[] = [
{
    id: "select",
    header: ({ table }) => (
        
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
        
            <Checkbox
            className="bg-white border border-gray-950"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
    ),
    enableSorting: false,
    enableHiding: false,
  },   
{
    accessorKey: "uid",
    header: "UID",

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
    accessorKey: "cpf",
    header:"CPF",
        cell: ({ row }) => {
        // Formata a data para exibição, pois 'dataInicio' é um objeto Date
        return row.original.cpf;
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
                <AcoesTabela uid={acampa.uid || ""}/>
            </DropdownMenu>
        )
    }
}
]
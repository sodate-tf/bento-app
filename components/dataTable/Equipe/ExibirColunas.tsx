import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef, Table } from "@tanstack/react-table"


interface ExibirColunasProps{
    table: Table<TData>
}
export default function ExibirColunas(props: ExibirColunasProps){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto flex items-center justify-end">
                    Exibir Colunas
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {props.table
                    .getAllColumns()
                    .filter(
                    (column) => column.getCanHide()
                    )
                    .map((column) => {
                        return(
                        <DropdownMenuCheckboxItem 
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) => 
                            column.toggleVisibility(!!value)
                            }
                        >
                            {column.id}        
                        </DropdownMenuCheckboxItem>
                        )
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useState } from "react"
interface FiltrarPorProps{
    table: Table
}
export default function FiltrarPor(props: FiltrarPorProps){
    const [filtroPor, setFiltroPor] = useState('nome')
    
    return(
        <div className="flex">
            <div className="flex">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto flex items-center justify-end">
                            Filtrar por:
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {props.table
                            .getAllColumns()
                            .filter(
                            (column) => column.getCanHide()
                            )
                            .map((column) => {
                            if (column.id !== 'Ação' && column.id !== 'dataNascimento'){
                                return(
                                <DropdownMenuCheckboxItem 
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.id === filtroPor}
                                    onCheckedChange={(value) => {
                                        setFiltroPor(column.id)
                                    }}
                                >
                                    {column.id}        
                                </DropdownMenuCheckboxItem>
                                )
                                }
                            })
                        }
                        </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex">
                <Input
                placeholder="Filtrar ..."
                value={(props.table.getColumn(filtroPor)?.getFilterValue() as string) ?? ""} 
                onChange={(event) => {
                    console.log(filtroPor)
                    props.table.getColumn(filtroPor)?.setFilterValue(event.target.value)
                }}
                className="max-w-sm bg-white"
                />
            </div>
        </div>
    )
}
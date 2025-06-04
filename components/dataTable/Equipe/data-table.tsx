"use client"
 
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state:{
       sorting,
       columnFilters,
       columnVisibility
    }
  })
  return(
    <div className="flex flex-col"> 
        <div className="flex items-center py-4">
            <Input
                placeholder="Filtrar Equipe..."
                value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""} 
                onChange={(event) => 
                    table.getColumn("nome")?.setFilterValue(event.target.value)
                }
                className="max-w-sm bg-white"
                />

                <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto flex items-center justify-end">
                    Exibir Colunas
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {table
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
        </div>
        
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id }>
                            {headerGroup.headers.map((header) =>{
                                return(
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder 
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, i) => (
                            <TableRow
                            key={row.id}
                            className={(i % 2 === 0) ? "bg-gray-300" : "bg-indigo-100"}
                            data-state={row.getIsSelected() && "selelected"}
                            >
                                {row.getVisibleCells().map((cell) =>(
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Não foi encontrado resultados
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
               Próximo
            </Button>
        </div>
    </div>
  )
}


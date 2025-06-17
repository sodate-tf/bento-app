// frontend/src/components/dataTable/Acampamentos/data-table.tsx
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  // Importe aqui o tipo TableMeta e RowData
  TableMeta,
  RowData
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Se você usa os componentes de tabela do Shadcn UI

// Extensão do tipo TableMeta, garantindo que o TypeScript conheça suas props customizadas.
// Este bloco deve estar em um arquivo .d.ts como `src/types/tanstack-table.d.ts`
// mas estou incluindo-o aqui temporariamente para referência clara do problema.
// REMOVA ESTE BLOCO APÓS ADICIONAR O .d.ts
/*
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onCopyLink?: (uid: string) => void;
    onEdit?: (acampamento: TData) => void; // Use TData para ser genérico aqui
    onDelete?: (uid: string) => void;
    onShowAlert?: (message: string, bgColor: string, Icon: React.ElementType) => void;
    IconeCheck?: React.ElementType;
    IconeExclamacao?: React.ElementType;
  }
}
*/


// Definição da interface de props para o seu componente DataTable
interface DataTableProps<TData extends RowData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // *** ADICIONE AQUI A PROPRIEDADE 'meta' ***
  // Ela deve ser do tipo TableMeta, que agora o TypeScript reconhecerá
  // se você tiver o arquivo `tanstack-table.d.ts` configurado.
  meta?: TableMeta<TData>; // O 'meta' é opcional
}

export function DataTable<TData extends RowData, TValue>({
  columns,
  data,
  meta, // *** RECEBA A PROPRIEDADE 'meta' AQUI ***
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // *** PASSE A PROPRIEDADE 'meta' PARA useReactTable AQUI ***
    meta, // Isso é o que permite que as colunas acessem as funções
  });

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

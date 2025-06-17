// Importa os tipos necessários para suas funções de callback
import { Acampamento } from "@/components/dataTable/Acampamentos/columns";

// Declara o módulo '@tanstack/react-table' para estender seus tipos.
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    // Adicione as propriedades personalizadas que você está passando no 'meta'
    onCopyLink?: (uid: string) => void;
    onEdit?: (acampamento: Acampamento) => void;
    onDelete?: (uid: string) => void;
    onShowAlert?: (message: string, bgColor: string, Icon: React.ElementType) => void;
    IconeCheck?: React.ElementType;
    IconeExclamacao?: React.ElementType;
  }
}
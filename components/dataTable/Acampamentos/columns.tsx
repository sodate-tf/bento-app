// frontend/src/components/dataTable/Acampamentos/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Copy, Pencil, Trash2, Check, XCircle } from 'lucide-react'; // Ícones para ações
import { IconeCheck, IconeExclamacao } from "@/components/icons";
import { exibirMsgAlerta } from "@/lib/utils";

// --- Interface Acampamento (Mantida como estava) ---

export interface Acampamento {
  uid: string;
  is_ativo: boolean; // Corresponde ao is_ativo do backend, renomeado para isPendente
  nome: string; // Corresponde ao nome_acampa do backend
  slug: string;
  dataInicio: Date; // Mapeado de data_inicio
  dataFinal: Date; // Mapeado de data_final
  local: string; // Mapeado de local
  taxa_equipe: number;
  taxa_externa: number;
  taxa_campista: number;
  chave_pix: string;
  url_link_pagamento: string;
  musica_tema: string;
  leitura_tema: string;
  cronograma: string;
  arte_camiseta: string;
  cardapio: string;
  // Propriedade adicional para o status da tabela, se necessário
  isPendente: boolean;
}

// --- Definição das colunas para a tabela ---
export const columns: ColumnDef<Acampamento>[] = [
  {
    accessorKey: "nome",
    header: "Nome do Acampamento",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">{row.original.nome}</span>
    ),
  },
  {
    accessorKey: "local",
    header: "Local",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.local}</span>
    ),
  },
  {
    accessorKey: "dataInicio",
    header: "Data de Início",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.dataInicio.toLocaleDateString('pt-BR')}</span>
    ),
  },
  {
    accessorKey: "dataFinal",
    header: "Data Final",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.dataFinal.toLocaleDateString('pt-BR')}</span>
    ),
  },
  {
    accessorKey: "isPendente",
    header: "Status",
    cell: ({ row }) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        row.original.isPendente
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-green-100 text-green-800'
      }`}>
        {row.original.isPendente ? 'Pendente' : 'Ativo'}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row, table }) => {
      const acampamento = row.original;
      // Acessa as funções de callback passadas via table.options.meta
      const { onCopyLink, onEdit, onDelete, onShowAlert } = table.options.meta || {};

      // Função auxiliar para copiar texto
      const copyTextToClipboard = async (text: string, showToast: (msg: string, bg: string, icon: any) => void) => {
        if (!navigator.clipboard || !window.isSecureContext) {
          console.error('Erro: API Clipboard não disponível ou ambiente não seguro (requer HTTPS).');
          exibirMsgAlerta('Cópia não suportada neste navegador.', 'red-950', IconeExclamacao);
          return;
        }
        try {
          await navigator.clipboard.writeText(text);
          console.log('Link copiado:', text);
          exibirMsgAlerta(`Link copiado: \n${text}`, 'cyan-950', IconeCheck);
        } catch (err) {
          console.error('Falha ao copiar:', err);
          exibirMsgAlerta('Falha ao copiar o link.', 'red-950', IconeExclamacao);
        }
      };

      // Handler para o botão de copiar link
      const handleCopyLink = () => {
        const linkBase = "http://localhost:3000/acampabento/"; // Base do link do seu frontend
        const fullLink = `${linkBase}${acampamento.uid}`;
        if (onShowAlert) { // Garante que a função de alerta foi passada
            copyTextToClipboard(fullLink, onShowAlert);
        }
      };


      // Verificações de segurança para as funções
      if (typeof onEdit !== 'function' || typeof onDelete !== 'function' || typeof onShowAlert !== 'function') {
          console.error("Funções de callback (onEdit, onDelete, onShowAlert) não foram passadas corretamente para DataTable.");
          return <span className="text-red-500">Erro de configuração.</span>;
      }

      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 p-1"
            title="Copiar Link de Inscrição"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(acampamento)} // Passa o objeto completo para edição
            className="text-green-950 hover:text-green-950 flex items-center gap-1 p-1"
            title="Editar Acampamento"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(acampamento.uid)} // Passa apenas o UID para exclusão
            className="text-red-600 hover:text-red-800 flex items-center gap-1 p-1"
            title="Excluir Acampamento"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

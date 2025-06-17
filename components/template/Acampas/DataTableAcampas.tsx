// frontend/src/components/template/Acampas/DataTableAcampas.tsx
"use client";

import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import AcampamentosClass from "@/components/context/acampamentos";
import { Acampamento, columns } from "@/components/dataTable/Acampamentos/columns";
import { DataTable } from "@/components/dataTable/Acampamentos/data-table"; // Seu componente DataTable
import acampamentoService, { AcampamentoApiData } from '@/src/service/acampamentoService'; // Serviço da API

// Define as props que este componente espera
interface DataTableAcampasProps {
    onEdit: (acampamento: Acampamento) => void;
    onDelete: (uid: string) => void;
    onShowAlert: (message: string, bgColor: string, Icon: React.ElementType) => void; // Para o copiar link
    IconeCheck: React.ElementType; // Ícone de check para o copiar link
    IconeExclamacao: React.ElementType; // Ícone de exclamação para o copiar link
}

// Usa forwardRef para permitir que o componente pai (Acampamentos.tsx) acesse métodos internos
const DataTableAcampas = forwardRef<any, DataTableAcampasProps>(({ onEdit, onDelete, onShowAlert, IconeCheck, IconeExclamacao }, ref) => {
    const [acampamentos, setAcampamentos] = useState<Acampamento[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar todos os acampamentos do backend
    const fetchAcampamentosData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const backendData: AcampamentoApiData[] = await acampamentoService.getAll();

            const transformedData: Acampamento[] = backendData.map((acampaData: AcampamentoApiData) => {
                // Certifique-se de que este mapeamento corresponde EXATAMENTE
                // à sua interface Acampamento em columns.tsx e à sua tabela SQL
                return {
                    uid: acampaData.uid ? acampaData.uid.toString() : '',
                    is_ativo: acampaData.is_ativo, // Mapeia diretamente
                    nome: acampaData.nome_acampa, // Mapeia nome_acampa para nome
                    slug: acampaData.slug,
                    dataInicio: new Date(acampaData.data_inicio),
                    dataFinal: new Date(acampaData.data_final),
                    local: acampaData.local, // Mapeia 'local' para 'localizacao'
                    taxa_equipe: acampaData.taxa_equipe,
                    taxa_externa: acampaData.taxa_externa,
                    taxa_campista: acampaData.taxa_campista,
                    chave_pix: acampaData.chave_pix,
                    url_link_pagamento: acampaData.url_link_pagamento,
                    musica_tema: acampaData.musica_tema,
                    leitura_tema: acampaData.leitura_tema,
                    cronograma: acampaData.cronograma,
                    arte_camiseta: acampaData.arte_camiseta,
                    cardapio: acampaData.cardapio,
                    isPendente: !acampaData.is_ativo // Deriva isPendente de is_ativo
                };
            });
            setAcampamentos(transformedData);
        } catch (err: any) {
            console.error("Erro ao buscar acampamentos:", err);
            setError(err.message || "Não foi possível carregar os acampamentos.");
            onShowAlert("Erro ao carregar acampamentos!", 'red-950', IconeExclamacao);
        } finally {
            setLoading(false);
        }
    }, [onShowAlert, IconeExclamacao]); // Adiciona dependências de useCallback

    // Expose refreshData function to parent component via ref
    useImperativeHandle(ref, () => ({
        refreshData: fetchAcampamentosData,
    }));

    // Efeito para carregar os acampamentos na montagem do componente
    useEffect(() => {
        fetchAcampamentosData();
    }, [fetchAcampamentosData]); // Dependência de useCallback

    if (loading) {
        return (
            <div className="flex flex-col mx-auto py-10 w-full text-center text-gray-700">
                <p>Carregando acampamentos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col mx-auto py-10 w-full text-center text-red-600">
                <p>Erro ao carregar acampamentos: {error}</p>
                <p>Por favor, verifique se o servidor backend está rodando e acessível.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col mx-auto py-10 w-full">
            <DataTable
                columns={columns}
                data={acampamentos}
                // Passa as funções de callback e os ícones para as colunas via 'meta'
                meta={{
                    onEdit,
                    onDelete,
                    onShowAlert
                }}
            />
        </div>
    );
});

DataTableAcampas.displayName = 'DataTableAcampas'; // Adiciona um nome de exibição para depuração

export default DataTableAcampas;

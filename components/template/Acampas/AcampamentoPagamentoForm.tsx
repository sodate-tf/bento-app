"use client"; // Componente cliente para interatividade

import React from "react";

import { DollarSign, Key, Link } from 'lucide-react'; // Ícones para os campos
import InputWithIcon from "@/components/InputWithIcon";

// Propriedades para o componente AcampamentoPagamentoForm
interface AcampamentoPagamentoFormProps {
    taxa_equipe: string;
    setTaxaEquipe: (value: string) => void;
    taxa_externa: string;
    setTaxaExterna: (value: string) => void;
    taxa_campista: string;
    setTaxaCampista: (value: string) => void;
    chave_pix: string;
    setChavePix: (value: string) => void;
    url_link_pagamento: string;
    setUrlLinkPagamento: (value: string) => void;
    errors: { [key: string]: string }; // Objeto de erros do formulário principal
}

/**
 * Componente para gerenciar a seção de valores e pagamento do acampamento.
 * Contém campos para taxas de diferentes tipos de participantes, chave Pix e link de pagamento.
 */
const AcampamentoPagamentoForm: React.FC<AcampamentoPagamentoFormProps> = ({
    taxa_equipe, setTaxaEquipe, taxa_externa, setTaxaExterna, taxa_campista, setTaxaCampista,
    chave_pix, setChavePix, url_link_pagamento, setUrlLinkPagamento, errors
}) => {
    return (
        <>
            <h3 className="col-span-full text-lg font-semibold text-gray-700 mt-4 mb-2 border-b pb-2">Valores e Pagamento</h3>

            <InputWithIcon
                id="taxa_campista"
                labelText="Taxa Campista"
                icon={DollarSign}
                type="number"
                step="0.01"
                value={taxa_campista}
                onChange={(e: any) => setTaxaCampista(e.target.value)}
                required
                error={errors.taxa_campista}
                placeholder="R$ 0.00"
            />
            <InputWithIcon
                id="taxa_equipe"
                labelText="Taxa Equipe"
                icon={DollarSign}
                type="number"
                step="0.01"
                value={taxa_equipe}
                onChange={(e: any) => setTaxaEquipe(e.target.value)}
                error={errors.taxa_equipe}
                placeholder="R$ 0.00"
            />
            <InputWithIcon
                id="taxa_externa"
                labelText="Taxa Externa"
                icon={DollarSign}
                type="number"
                step="0.01"
                value={taxa_externa}
                onChange={(e: any) => setTaxaExterna(e.target.value)}
                error={errors.taxa_externa}
                placeholder="R$ 0.00"
            />

            <InputWithIcon
                id="chave_pix"
                labelText="Chave Pix"
                icon={Key}
                value={chave_pix}
                onChange={(e: any) => setChavePix(e.target.value)}
                placeholder="seuemail@exemplo.com ou CPF"
            />
            <InputWithIcon
                id="url_link_pagamento"
                labelText="URL Link Pagamento"
                icon={Link}
                value={url_link_pagamento}
                onChange={(e: any) => setUrlLinkPagamento(e.target.value)}
                placeholder="https://seu-link-de-pagamento.com"
            />
            <div className="hidden lg:block"></div> {/* Espaçador para layout */}
        </>
    );
};

export default AcampamentoPagamentoForm;

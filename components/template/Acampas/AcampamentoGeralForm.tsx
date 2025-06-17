"use client"; // Componente cliente para interatividade

import React from "react";

import { Calendar, MapPin, Tag, Link } from 'lucide-react'; // Ícones para os campos
import InputWithIcon from "@/components/InputWithIcon";

// Propriedades para o componente AcampamentoGeralForm
interface AcampamentoGeralFormProps {
    nome_acampa: string;
    setNomeAcampa: (value: string) => void;
    slug: string;
    setSlug: (value: string) => void;
    data_inicio: string;
    setDataInicio: (value: string) => void;
    data_final: string;
    setDataFinal: (value: string) => void;
    local: string;
    setLocal: (value: string) => void;
    errors: { [key: string]: string }; // Objeto de erros do formulário principal
}

/**
 * Componente para gerenciar a seção de informações gerais do acampamento.
 * Contém campos como nome, slug, datas e local.
 */
const AcampamentoGeralForm: React.FC<AcampamentoGeralFormProps> = ({
    nome_acampa, setNomeAcampa, slug, setSlug,
    data_inicio, setDataInicio, data_final, setDataFinal,
    local, setLocal, errors
}) => {
    return (
        <>
            <h3 className="col-span-full text-lg font-semibold text-gray-700 mt-4 mb-2 border-b pb-2">Informações Gerais</h3>

            <InputWithIcon
                id="nome_acampa"
                labelText="Nome do Acampamento"
                icon={Tag}
                value={nome_acampa}
                onChange={(e: any) => setNomeAcampa(e.target.value)}
                required
                error={errors.nome_acampa}
                placeholder="Ex: Acampamento de Verão 2025"
            />
            <InputWithIcon
                id="slug"
                labelText="Slug (URL Amigável)"
                icon={Link}
                value={slug}
                onChange={(e: any) => setSlug(e.target.value)}
                required
                error={errors.slug}
                placeholder="acampamento-verao-2025"
            />
            <InputWithIcon
                id="local"
                labelText="Local"
                icon={MapPin}
                value={local}
                onChange={(e: any) => setLocal(e.target.value)}
                required
                error={errors.local}
                placeholder="Sítio do Vovô, Cidade - UF"
            />

            <InputWithIcon
                id="data_inicio"
                labelText="Data de Início"
                icon={Calendar}
                type="date"
                value={data_inicio}
                onChange={(e: any) => setDataInicio(e.target.value)}
                required
                error={errors.data_inicio}
            />
            <InputWithIcon
                id="data_final"
                labelText="Data Final"
                icon={Calendar}
                type="date"
                value={data_final}
                onChange={(e: any) => setDataFinal(e.target.value)}
                required
                error={errors.data_final}
            />
            <div className="hidden lg:block"></div> {/* Espaçador para layout */}
        </>
    );
};

export default AcampamentoGeralForm;

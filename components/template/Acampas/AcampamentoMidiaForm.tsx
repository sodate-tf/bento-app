"use client"; // Componente cliente para interatividade

import React from "react";

import { Music, BookOpen, AlignJustify, Image, CheckSquare } from 'lucide-react'; // Ícones para os campos
import InputWithIcon from "@/components/InputWithIcon";
import InputFileWithIcon from "@/components/InputFileIcons";

// Propriedades para o componente AcampamentoMidiaForm
interface AcampamentoMidiaFormProps {
    musica_tema: string;
    setMusicaTema: (value: string) => void;
    leitura_tema: string;
    setLeituraTema: (value: string) => void;
    
    existingCronogramaPath: string;
    newCronogramaFile: File | null;
    setNewCronogramaFile: (file: File | null) => void;
    onClearCronograma: () => void;

    existingArteCamisetaPath: string;
    newArteCamisetaFile: File | null;
    setNewArteCamisetaFile: (file: File | null) => void;
    onClearArteCamiseta: () => void;

    existingCardapioPath: string;
    newCardapioFile: File | null;
    setNewCardapioFile: (file: File | null) => void;
    onClearCardapio: () => void;

    errors: { [key: string]: string }; // Objeto de erros do formulário principal
}

/**
 * Componente para gerenciar a seção de conteúdo e mídias do acampamento.
 * Inclui campos de texto para música e leitura tema, e campos de arquivo para cronograma, arte da camiseta e cardápio.
 */
const AcampamentoMidiaForm: React.FC<AcampamentoMidiaFormProps> = ({
    musica_tema, setMusicaTema, leitura_tema, setLeituraTema,
    existingCronogramaPath, newCronogramaFile, setNewCronogramaFile, onClearCronograma,
    existingArteCamisetaPath, newArteCamisetaFile, setNewArteCamisetaFile, onClearArteCamiseta,
    existingCardapioPath, newCardapioFile, setNewCardapioFile, onClearCardapio,
    errors
}) => {
    return (
        <>
            <h3 className="col-span-full text-lg font-semibold text-gray-700 mt-4 mb-2 border-b pb-2">Conteúdo e Mídias</h3>

            <InputWithIcon
                id="musica_tema"
                labelText="Música Tema"
                icon={Music}
                value={musica_tema}
                onChange={(e: any) => setMusicaTema(e.target.value)}
                placeholder="Título da Música Tema"
            />
            <InputWithIcon
                id="leitura_tema"
                labelText="Leitura Tema"
                icon={BookOpen}
                value={leitura_tema}
                onChange={(e: any) => setLeituraTema(e.target.value)}
                placeholder="Ex: Gênesis 1:1-10"
            />
            <div className="hidden lg:block"></div> {/* Espaçador para layout */}

            <InputFileWithIcon
                id="cronograma"
                labelText="Cronograma (Arquivo)"
                icon={AlignJustify}
                onChange={(e: any) => setNewCronogramaFile(e.target.files?.[0] || null)}
                existingFilePath={existingCronogramaPath}
                newFile={newCronogramaFile}
                onClearExistingFile={onClearCronograma}
                error={errors.cronograma}
            />
            <InputFileWithIcon
                id="arte_camiseta"
                labelText="Arte Camiseta (Arquivo)"
                icon={Image}
                onChange={(e: any) => setNewArteCamisetaFile(e.target.files?.[0] || null)}
                existingFilePath={existingArteCamisetaPath}
                newFile={newArteCamisetaFile}
                onClearExistingFile={onClearArteCamiseta}
                error={errors.arte_camiseta}
            />
            <InputFileWithIcon
                id="cardapio"
                labelText="Cardápio (Arquivo)"
                icon={CheckSquare}
                onChange={(e: any) => setNewCardapioFile(e.target.files?.[0] || null)}
                existingFilePath={existingCardapioPath}
                newFile={newCardapioFile}
                onClearExistingFile={onClearCardapio}
                error={errors.cardapio}
            />
        </>
    );
};

export default AcampamentoMidiaForm;

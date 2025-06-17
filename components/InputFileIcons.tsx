"use client"; // Componente cliente para interatividade

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, XCircle } from 'lucide-react'; // Ícones para download e remover

// Propriedades para o componente InputFileWithIcon
interface InputFileWithIconProps {
    id: string; // ID único para o input e label
    labelText: string; // Texto do label
    icon?: React.ElementType; // Componente de ícone (ex: UploadCloud do Lucide React)
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Função para lidar com a seleção do arquivo
    required?: boolean; // Indica se o campo é obrigatório
    error?: string; // Mensagem de erro a ser exibida
    existingFilePath: string; // Caminho para um arquivo existente (se houver)
    newFile: File | null; // Novo arquivo selecionado pelo usuário
    onClearExistingFile: () => void; // Função para limpar o arquivo existente/selecionado
    className?: string; // Classes Tailwind adicionais para o container
}

/**
 * Componente de input de arquivo com um label, ícone opcional,
 * exibição do nome do arquivo (existente ou novo) e botões de download/limpar.
 * Projetado para ser reutilizável em todo o projeto.
 */
const InputFileWithIcon: React.FC<InputFileWithIconProps> = ({ id, labelText, icon: Icon, onChange, required = false, error, existingFilePath, newFile, onClearExistingFile, className }) => {
    // Extrai o nome do arquivo da URL existente ou usa o nome do novo arquivo
    const fileName = existingFilePath ? existingFilePath.split('/').pop() : '';
    const displayFileName = newFile ? newFile.name : fileName;
    const fileToDownload = existingFilePath; // A URL real para download

    return (
        <div className={`min-w-0 ${className || ''}`}>
            <Label htmlFor={id}>{labelText} {required && <span className="text-red-500">*</span>}</Label>
            <div className="relative mt-1">
                <Input
                    id={id}
                    type="file"
                    onChange={onChange}
                    // O campo é obrigatório se não houver arquivo existente nem novo arquivo
                    required={required && !existingFilePath && !newFile}
                    // Classes Tailwind para estilizar o input de arquivo e garantir responsividade
                    className={`w-full pl-10 pr-4 py-0 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} rounded-md transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                />
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />}
            </div>

            {(displayFileName || fileToDownload) && (
                <div className="flex items-center text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded-md">
                    {displayFileName ? (
                        <span className="truncate flex-1">
                            Arquivo: <strong title={displayFileName}>{displayFileName}</strong>
                        </span>
                    ) : (
                        <span className="truncate flex-1">
                            Arquivo cadastrado.
                        </span>
                    )}
                    
                    {fileToDownload && (
                        // Botão de download para arquivos existentes
                        <a href={fileToDownload} target="_blank" rel="noopener noreferrer" className="ml-2 mr-1">
                            <Button type="button" variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-1">
                                <Download size={18} />
                            </Button>
                        </a>
                    )}

                    {onClearExistingFile && (
                        // Botão para limpar o arquivo selecionado ou existente
                        <Button type="button" onClick={onClearExistingFile} variant="ghost" size="sm" className="text-red-500 hover:text-red-700 p-1">
                            <XCircle size={18} />
                        </Button>
                    )}
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default InputFileWithIcon;

"use client"; // Componente cliente para interatividade

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Propriedades para o componente TextareaWithIcon
interface TextareaWithIconProps {
    id: string; // ID único para o textarea e label
    labelText: string; // Texto do label
    icon?: React.ElementType; // Componente de ícone (ex: AlignJustify do Lucide React)
    value: string; // Valor atual do textarea
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Função para lidar com a mudança
    rows?: number; // Número de linhas visíveis
    error?: string; // Mensagem de erro a ser exibida
    placeholder?: string; // Texto de placeholder do textarea
    className?: string; // Classes Tailwind adicionais para o container
}

/**
 * Componente de textarea com um label, ícone opcional e exibição de erro.
 * Projetado para ser reutilizável em todo o projeto.
 */
const TextareaWithIcon: React.FC<TextareaWithIconProps> = ({ id, labelText, icon: Icon, value, onChange, rows = 3, error, placeholder, className }) => (
    <div className={`col-span-full ${className || ''}`}>
        <Label htmlFor={id}>{labelText}</Label>
        <div className="relative mt-1">
            <Textarea
                id={id}
                value={value}
                onChange={onChange}
                rows={rows}
                placeholder={placeholder}
                // Classes Tailwind para responsividade e estilo
                className={`w-full pl-10 pr-4 py-2 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} rounded-md transition-all duration-200 resize-y`}
            />
            {Icon && <Icon className="absolute left-3 top-3 text-gray-400" size={20} />}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default TextareaWithIcon;

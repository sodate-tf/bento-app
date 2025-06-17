"use client"; // Componente cliente para interatividade

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Propriedades para o componente InputWithIcon
interface InputWithIconProps {
    id: string; // ID único para o input e label
    labelText: string; // Texto do label
    icon?: React.ElementType; // Componente de ícone (ex: Tag, Calendar do Lucide React)
    value: string | number; // Valor atual do input
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Função para lidar com a mudança
    type?: string; // Tipo do input (ex: "text", "number", "date")
    required?: boolean; // Indica se o campo é obrigatório
    step?: string; // Para inputs tipo "number", define o passo de incremento/decremento
    error?: string; // Mensagem de erro a ser exibida
    placeholder?: string; // Texto de placeholder do input
    className?: string; // Classes Tailwind adicionais para o container
}

/**
 * Componente de input com um label, ícone opcional e exibição de erro.
 * Projetado para ser reutilizável em todo o projeto.
 */
const InputWithIcon: React.FC<InputWithIconProps> = ({ id, labelText, icon: Icon, value, onChange, type = "text", required = false, step, error, placeholder, className }) => (
    <div className={`min-w-0 ${className || ''}`}>
        <Label htmlFor={id}>{labelText} {required && <span className="text-red-500">*</span>}</Label>
        <div className="relative mt-1">
            <Input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                step={step}
                placeholder={placeholder}
                // Classes Tailwind para responsividade e estilo
                className={`w-full pl-10 pr-4 py-2 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} rounded-md transition-all duration-200`}
            />
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default InputWithIcon;

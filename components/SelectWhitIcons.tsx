"use client"; // Necessário se você estiver usando o App Router

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react"; // Para o tipo de ícone

// Interface para cada opção do Select
interface SelectOption {
    value: string;
    label: string;
    icon?: React.ElementType; // Pode ser um componente React ou um LucideIcon
}

// Props para o componente SelectWithIcon
interface SelectWithIconProps {
    id: string;
    labelText: string;
    options: SelectOption[];
    value: string | undefined; // O valor selecionado, pode ser undefined
    // === PONTO CHAVE DE CORREÇÃO ===
    // Renomeie 'onChange' para 'onValueChange' se era o caso,
    // e certifique-se de que ele aceita apenas o novo valor (string).
    onValueChange: (value: string) => void; // Função para lidar com a mudança de valor
    error?: string;
    className?: string;
    icon?: LucideIcon; // Para o ícone visual ao lado do label
}

const SelectWithIcon: React.FC<SelectWithIconProps> = ({
    id,
    labelText,
    options,
    value,
    onValueChange, // Deve ser desestruturado assim
    error,
    className,
    icon: Icon, // Renomeado para Icon (maiusculo) para ser usado como componente
}) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <Label htmlFor={id} className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4 text-gray-600" />} {/* Renderiza o ícone se existir */}
                {labelText}
            </Label>
            <Select onValueChange={onValueChange} value={value || ""}>
                <SelectTrigger id={id} className={`w-full ${error ? "border-red-500" : ""}`}>
                    <SelectValue placeholder={`Selecione um ${labelText.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.icon && React.createElement(option.icon, { className: "inline-block h-4 w-4 mr-2" })}
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default SelectWithIcon;
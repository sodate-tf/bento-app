"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, ShieldCheck } from 'lucide-react'; // Ícone para CPF

// Função de validação de CPF (importada ou definida localmente)
// Esta é uma implementação básica. Para produção, considere uma biblioteca mais robusta.
const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(9, 10))) {
        return false;
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(10, 11))) {
        return false;
    }
    return true;
};

// Função de máscara de CPF
const formatCPF = (value: string): string => {
    value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen
    return value;
};

interface CPFWithIconProps {
    id: string;
    labelText: string;
    value: string; // O valor para CPF sempre será string
    onChange: (value: string) => void; // Retorna o valor já mascarado
    onBlur?: (value: string, isValid: boolean) => void; // Opcional: para notificar o pai sobre a validação
    required?: boolean;
    error?: string; // Mensagem de erro externa (pode vir do componente pai)
    placeholder?: string;
    className?: string; // Classes Tailwind adicionais para o container
    icon?: React.ElementType; // Permite ícone customizado, padrão será User/ShieldCheck
}

const CPFWithIcon: React.FC<CPFWithIconProps> = ({
    id,
    labelText,
    value,
    onChange,
    onBlur,
    required = false,
    error,
    placeholder = "000.000.000-00",
    className,
    icon: Icon = User // Padrão de ícone
}) => {
    const [internalError, setInternalError] = React.useState<string | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const maskedValue = formatCPF(rawValue);
        onChange(maskedValue); // Envia o valor mascarado para o pai
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^\d]+/g, ''); // Remove a máscara para validação
        let currentError: string | undefined = undefined;

        if (required && !rawValue) {
            currentError = 'CPF é obrigatório.';
        } else if (rawValue && !validateCPF(rawValue)) {
            currentError = 'CPF inválido.';
        }
        setInternalError(currentError);

        if (onBlur) {
            onBlur(rawValue, !currentError); // Envia o valor limpo e o status de validação para o pai
        }
    };

    // Use o erro externo se provided, senão o erro interno
    const displayError = error || internalError;

    return (
        <div className={`min-w-0 ${className || ''}`}>
            <Label htmlFor={id}>{labelText} {required && <span className="text-red-500">*</span>}</Label>
            <div className="relative mt-1">
                <Input
                    id={id}
                    type="text" // Tipo text para permitir a máscara
                    inputMode="numeric" // Sugere teclado numérico em mobile
                    maxLength={14} // 11 dígitos + 3 caracteres de máscara (14)
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={required}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-4 py-2 ${displayError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} rounded-md transition-all duration-200`}
                />
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />}
            </div>
            {displayError && <p className="text-red-500 text-sm mt-1">{displayError}</p>}
        </div>
    );
};

export default CPFWithIcon;

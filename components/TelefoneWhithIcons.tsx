"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from 'lucide-react'; // Ícone para Telefone

// Função de máscara de Telefone
const formatTelefone = (value: string): string => {
    value = value.replace(/\D/g, ''); // Remove tudo que não é dígito

    if (value.length > 10) { // Telefone com 9 dígitos (celular)
        value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 5) { // Telefone com 8 dígitos (fixo ou celular antigo)
        value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) { // Apenas DDD
        value = value.replace(/^(\d\d)(\d)/, '($1) $2');
    }
    return value;
};

// Função de validação de Telefone (apenas formato básico)
const validateTelefone = (telefone: string): boolean => {
    telefone = telefone.replace(/\D/g, ''); // Remove a máscara
    // Valida se tem 10 ou 11 dígitos (DDD + número)
    return telefone.length === 10 || telefone.length === 11;
};

interface TelefoneWithIconProps {
    id: string;
    labelText: string;
    value: string; // O valor para Telefone sempre será string
    onChange: (value: string) => void; // Retorna o valor já mascarado
    onBlur?: (value: string, isValid: boolean) => void; // Opcional: para notificar o pai sobre a validação
    required?: boolean;
    error?: string; // Mensagem de erro externa
    placeholder?: string;
    className?: string; // Classes Tailwind adicionais
    icon?: React.ElementType; // Permite ícone customizado, padrão será Phone
}

const TelefoneWithIcon: React.FC<TelefoneWithIconProps> = ({
    id,
    labelText,
    value,
    onChange,
    onBlur,
    required = false,
    error,
    placeholder = "(00) 00000-0000",
    className,
    icon: Icon = Phone
}) => {
    const [internalError, setInternalError] = React.useState<string | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const maskedValue = formatTelefone(rawValue);
        onChange(maskedValue);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // Remove a máscara para validação
        let currentError: string | undefined = undefined;

        if (required && !rawValue) {
            currentError = 'Telefone é obrigatório.';
        } else if (rawValue && !validateTelefone(rawValue)) {
            currentError = 'Telefone inválido (ex: (DD) 9XXXX-YYYY ou (DD) XXXX-YYYY).';
        }
        setInternalError(currentError);

        if (onBlur) {
            onBlur(rawValue, !currentError);
        }
    };

    const displayError = error || internalError;

    return (
        <div className={`min-w-0 ${className || ''}`}>
            <Label htmlFor={id}>{labelText} {required && <span className="text-red-500">*</span>}</Label>
            <div className="relative mt-1">
                <Input
                    id={id}
                    type="tel" // Tipo tel para teclado numérico otimizado para telefone
                    inputMode="numeric"
                    maxLength={15} // Ex: (99) 99999-9999 (15 caracteres)
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

export default TelefoneWithIcon;

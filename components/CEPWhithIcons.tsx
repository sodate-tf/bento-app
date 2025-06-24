"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from 'lucide-react'; // Ícone para CEP

// Função de máscara de CEP
const formatCEP = (value: string): string => {
    value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen após 5 dígitos
    return value;
};

// Função de validação de CEP (apenas formato)
const validateCEP = (cep: string): boolean => {
    cep = cep.replace(/\D/g, ''); // Remove a máscara
    return cep.length === 8; // CEP deve ter 8 dígitos
};

interface CEPWithIconProps {
    id: string;
    labelText: string;
    value: string; // O valor para CEP sempre será string
    onChange: (value: any) => void; // Retorna o valor já mascarado
    onBlur?: (value: any, isValid: boolean) => void; // Opcional: para notificar o pai sobre a validação
    required?: boolean;
    error?: string; // Mensagem de erro externa
    placeholder?: string;
    className?: string; // Classes Tailwind adicionais
    icon?: React.ElementType; // Permite ícone customizado, padrão será MapPin
}

const CEPWithIcon: React.FC<CEPWithIconProps> = ({
    id,
    labelText,
    value,
    onChange,
    onBlur,
    required = false,
    error,
    placeholder = "00000-000",
    className,
    icon: Icon = MapPin
}) => {
    const [internalError, setInternalError] = React.useState<string | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const maskedValue = formatCEP(rawValue);
        onChange(maskedValue);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // Remove a máscara para validação
        let currentError: string | undefined = undefined;

        if (required && !rawValue) {
            currentError = 'CEP é obrigatório.';
        } else if (rawValue && !validateCEP(rawValue)) {
            currentError = 'CEP inválido.';
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
                    type="text" // Tipo text para permitir a máscara
                    inputMode="numeric" // Sugere teclado numérico
                    maxLength={9} // 8 dígitos + 1 hífen (9)
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

export default CEPWithIcon;

"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from 'lucide-react'; // Ícone para Email

// Função de validação de e-mail (regex simples)
const validateEmail = (email: string): boolean => {
    // Regex para validar formato básico de e-mail
    // Este regex cobre a maioria dos casos, mas e-mails válidos podem ter formatos mais complexos.
    // Para validação de e-mail mais robusta em produção, considere bibliotecas dedicadas ou validação no backend.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

interface EmailWithIconProps {
    id: string;
    labelText: string;
    value: string; // O valor para e-mail sempre será string
    onChange: (value: any) => void; // Retorna o valor do input
    onBlur?: (value: any, isValid: boolean) => void; // Opcional: para notificar o pai sobre a validação
    required?: boolean;
    error?: string; // Mensagem de erro externa (pode vir do componente pai)
    placeholder?: string;
    className?: string; // Classes Tailwind adicionais para o container
    icon?: React.ElementType; // Permite ícone customizado, padrão será Mail
}

const EmailWithIcon: React.FC<EmailWithIconProps> = ({
    id,
    labelText,
    value,
    onChange,
    onBlur,
    required = false,
    error,
    placeholder = "exemplo@dominio.com",
    className,
    icon: Icon = Mail // Padrão de ícone
}) => {
    const [internalError, setInternalError] = React.useState<string | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value); // Envia o valor bruto para o pai
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.trim(); // Remove espaços em branco extras
        let currentError: string | undefined = undefined;

        if (required && !rawValue) {
            currentError = 'Email é obrigatório.';
        } else if (rawValue && !validateEmail(rawValue)) {
            currentError = 'Email inválido.';
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
                    type="email" // Tipo "email" para o navegador oferecer sugestões e validação básica
                    inputMode="email" // Sugere teclado otimizado para email em mobile
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

export default EmailWithIcon;

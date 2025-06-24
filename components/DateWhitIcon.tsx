"use client";

import React, { useRef } from "react"; // Importe useRef para acessar o DOM diretamente
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays } from 'lucide-react'; // Ícone para Data

interface DateInputWithIconProps {
    id: string;
    labelText: string;
    value: string; // Valor da data no formato 'YYYY-MM-DD'
    onChange: (value: any) => void; // Retorna o valor da data no formato 'YYYY-MM-DD'
    onBlur?: (value: any, isValid: boolean) => void; // Opcional: para notificar o pai sobre a validação
    required?: boolean;
    error?: string; // Mensagem de erro externa (pode vir do componente pai)
    className?: string; // Classes Tailwind adicionais para o container
    icon?: React.ElementType; // Permite ícone customizado, padrão será CalendarDays
    min?: string; // Data mínima permitida (formato 'YYYY-MM-DD')
    max?: string; // Data máxima permitida (formato 'YYYY-MM-DD')
}

const DateInputWithIcon: React.FC<DateInputWithIconProps> = ({
    id,
    labelText,
    value,
    onChange,
    onBlur,
    required = false,
    error,
    className,
    icon: Icon = CalendarDays, // Padrão de ícone
    min,
    max,
}) => {
    const [internalError, setInternalError] = React.useState<string | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null); // Crie uma ref para o input

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value); // Envia o valor bruto (string YYYY-MM-DD) para o pai
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.trim();
        let currentError: string | undefined = undefined;

        if (required && !rawValue) {
            currentError = `${labelText} é obrigatório.`;
        } else if (rawValue) {
            // Adicione 'T00:00:00' para evitar problemas de fuso horário ao criar a data
            const selectedDate = new Date(rawValue + 'T00:00:00');

            // Verifica se a data é inválida (ex: '2023-02-30')
            if (isNaN(selectedDate.getTime())) {
                currentError = `${labelText} tem um formato inválido.`;
            } else {
                if (min) {
                    const minDate = new Date(min + 'T00:00:00');
                    if (selectedDate < minDate) {
                        currentError = `${labelText} não pode ser anterior a ${min}.`;
                    }
                }
                if (max && !currentError) { // Só verifica max se não houver erro de min
                    const maxDate = new Date(max + 'T00:00:00');
                    if (selectedDate > maxDate) {
                        currentError = `${labelText} não pode ser posterior a ${max}.`;
                    }
                }
            }
        }
        setInternalError(currentError);

        if (onBlur) {
            onBlur(rawValue, !currentError); // Envia o valor limpo e o status de validação para o pai
        }
    };

    // Função para focar o input quando o ícone é clicado
    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus(); // Foca o input, o que geralmente abre o seletor de data nativo
            // Em alguns navegadores, inputRef.current.showPicker() pode ser usado para forçar a abertura,
            // mas não é amplamente suportado ou pode exigir interação do usuário por segurança.
            // Focar é a forma mais robusta e cross-browser.
        }
    };

    // Use o erro externo se fornecido, senão o erro interno
    const displayError = error || internalError;

    return (
        <div className={`min-w-0 ${className || ''}`}>
            <Label htmlFor={id}>{labelText} {required && <span className="text-red-500">*</span>}</Label>
            <div className="relative mt-1">
                <Input
                    id={id}
                    type="date" // Tipo "date" para o navegador exibir o seletor de data
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={required}
                    min={min}
                    max={max}
                    ref={inputRef} // Atribua a ref ao input
                    className={`
                        w-full pl-10 pr-4 py-2
                        ${displayError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                        rounded-md transition-all duration-200
                        // Ajustes para o estilo do placeholder do input date em alguns navegadores
                        [&::-webkit-datetime-edit-month-field]:text-gray-900 // para webkit browsers (Chrome, Safari)
                        [&::-webkit-datetime-edit-day-field]:text-gray-900
                        [&::-webkit-datetime-edit-year-field]:text-gray-900
                        [&::-webkit-datetime-edit-text]:text-gray-900
                        [&::-webkit-inner-spin-button]:hidden // remove spin button in webkit
                        [&::-webkit-calendar-picker-indicator]:opacity-0 // Oculta o ícone de calendário nativo, pois usaremos o nosso
                        [&::placeholder]:text-gray-400 // cor do placeholder
                    `}
                    placeholder="YYYY-MM-DD" // Placeholder que aparece antes de uma data ser selecionada
                />
                {/* Ícone clicável para abrir o calendário */}
                {Icon && (
                    <div
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                        onClick={handleIconClick}
                        role="button" // Indica que é um elemento interativo
                        aria-labelledby={id} // Associa com o label do input para acessibilidade
                    >
                        <Icon size={20} />
                    </div>
                )}
            </div>
            {displayError && <p className="text-red-500 text-sm mt-1">{displayError}</p>}
        </div>
    );
};

export default DateInputWithIcon;

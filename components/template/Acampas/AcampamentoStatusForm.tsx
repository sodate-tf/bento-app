"use client"; // Componente cliente para interatividade

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Propriedades para o componente AcampamentoStatusForm
interface AcampamentoStatusFormProps {
    is_ativo: boolean;
    setIsAtivo: (checked: boolean) => void;
}

/**
 * Componente para gerenciar o status de ativação do acampamento.
 * Contém um checkbox para ativar ou desativar o acampamento.
 */
const AcampamentoStatusForm: React.FC<AcampamentoStatusFormProps> = ({ is_ativo, setIsAtivo }) => {
    return (
        <div className="col-span-full flex items-center space-x-2 mt-4 mb-6">
            <Checkbox
                id="is_ativo"
                checked={is_ativo}
                onCheckedChange={(checked) => setIsAtivo(Boolean(checked))}
                className="h-5 w-5 border-gray-300 focus:ring-blue-500 text-blue-600"
            />
            <Label htmlFor="is_ativo" className="text-base font-medium text-gray-700 cursor-pointer">
                Acampamento Ativo
            </Label>
        </div>
    );
};

export default AcampamentoStatusForm;

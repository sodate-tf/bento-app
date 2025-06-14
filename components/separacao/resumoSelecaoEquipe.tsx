import React from 'react';
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import TeamSummaryCollapsible from './resumoEquipeCollapsible'; // Ajuste o caminho de importação conforme a sua estrutura

// Define a interface para EquipeCampista, caso não seja globalmente disponível
interface EquipeCampista {
    uid: string;
    nome: string;
    // ... outras propriedades que sua equipeFake pode ter
}

interface TeamSummarySectionProps {
    /**
     * Lista de todos os nomes de equipes possíveis (ex: ['LÍDERES', 'APOIO']).
     */
    allTeamsNames: string[];
    /**
     * Objeto mapeando nomes de equipes para arrays de UIDs dos membros.
     * Ex: { 'LÍDERES': ['uid1', 'uid5'], 'APOIO': ['uid2'] }
     */
    teamsData: Record<string, string[]>;
    /**
     * Lista completa de todas as pessoas, usada para buscar os detalhes (nome, etc.) pelos UIDs.
     */
    allPeopleData: EquipeCampista[];
    /**
     * Callback acionado quando um membro é removido de uma equipe.
     * @param uid - O UID do membro a ser removido.
     * @param teamName - O nome da equipe de onde o membro será removido.
     */
    onRemoveMember: (uid: string, teamName: string) => void;
}

/**
 * Componente que agrupa e exibe o resumo de todas as equipes em seções recolhíveis.
 */
const TeamSummarySection: React.FC<TeamSummarySectionProps> = ({
    allTeamsNames,
    teamsData,
    allPeopleData,
    onRemoveMember,
}) => {
    return (
        <div className="w-full flex flex-col bg-gray-50 p-3 rounded-lg shadow-md">
           '' <Label className="text-2xl p-2 font-bold text-gray-800 mb-4">Resumo da Equipe</Label>
            
            {/* Mapeia e renderiza um Collapsible para cada equipe */}
            {allTeamsNames.map((teamName, index) => (
                <TeamSummaryCollapsible
                    key={teamName}
                    teamName={teamName}
                    memberUids={teamsData[teamName] || []} // Garante que é um array vazio se a equipe não tiver membros
                    allPeopleData={allPeopleData}
                    onRemoveMember={onRemoveMember}
                    isEvenRow={index % 2 === 0} // Alterna a cor de fundo para melhor visualização
                />
            ))}
        </div>
    );
};

export default TeamSummarySection;

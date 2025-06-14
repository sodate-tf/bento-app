import React, { useState, VoidFunctionComponent } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import TelaPerfil from "@/components/profile/TelaPerfil";
import EditarHistorico from "@/components/template/Equipe/MenuHistorico/EditarHistorico";
import { Handshake, UserCheck } from "lucide-react";

// Define a interface para EquipeCampista, caso não seja globalmente disponível
interface EquipeCampista {
    uid: string;
    nome: string;
    // ... outras propriedades que sua equipeFake pode ter
}

interface EquipeSelectionTableProps {
    /**
     * Lista de pessoas disponíveis para seleção e atribuição a equipes.
     */
    peopleToSelect: EquipeCampista[];
    /**
     * Nomes de todas as equipes possíveis (ex: 'LÍDERES', 'APOIO').
     */
    allTeamsNames: string[];
    /**
     * Mapeamento de UID da pessoa para o nome da equipe selecionada no Dropdown.
     */
    selectedEquipesMap: Record<string, string>;
    /**
     * Callback acionado quando o usuário seleciona uma equipe para uma pessoa no Dropdown.
     * @param uid - O UID da pessoa.
     * @param teamName - O nome da equipe selecionada.
     */
    onSelectTeam: (uid: string, teamName: string) => void;
    /**
     * Callback acionado quando o usuário clica para atribuir a pessoa à equipe selecionada.
     * @param uid - O UID da pessoa a ser atribuída.
     */
    onAssignTeam: (uid: string) => void;

}

/**
 * Componente de tabela para selecionar e atribuir pessoas a equipes.
 * Permite ao usuário escolher uma equipe para cada pessoa e confirmá-la.
 */
const EquipeSelectionTable: React.FC<EquipeSelectionTableProps> = ({
    peopleToSelect,
    allTeamsNames,
    selectedEquipesMap,
    onSelectTeam,
    onAssignTeam
}) => {

    
    return (
        <Table className="min-w-full table-auto mt-5">
            <TableHeader>
                <TableRow className="bg-gray-700 hover:bg-gray-700 text-gray-50">
                    <TableHead className="px-4 py-2 text-left text-gray-50 w-6">UID</TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-50">NOME</TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-50 w-6">PERFIL</TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-50 w-6">HISTÓRICO</TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-50 w-15">EQUIPE</TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-50 w-6S"></TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-50 w-6S"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* Exibe uma mensagem se não houver pessoas para selecionar */}
                {peopleToSelect.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                            Nenhuma pessoa restante para ser atribuída.
                        </TableCell>
                    </TableRow>
                ) : (
                    // Mapeia e renderiza cada pessoa na tabela
                    peopleToSelect.map((person, i) => (
                        <TableRow key={person.uid} className={(i % 2 === 0) ? "bg-gray-300 hover:bg-gray-50" : "bg-neutral-200 hover:bg-gray-50"}>
                            <TableCell className="px-4 py-2 text-left">{person.uid}</TableCell>
                            <TableCell className="px-4 py-2 text-left">{person.nome}</TableCell>
                            <TableCell className="px-4 py-2 text-left">
                                {/* Componente de Perfil (abre em uma Sheet) */}
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>Perfil</AvatarFallback>
                                        </Avatar>
                                    </SheetTrigger>
                                    <SheetContent className="overflow-auto min-w-2/3 w-2/3 sm:w-[350px] md:w-[450px] lg:w-[600px] flex flex-col">
                                        <ScrollArea className="flex-1 py-4 ">
                                            <TelaPerfil />
                                        </ScrollArea>
                                    </SheetContent>
                                </Sheet>
                            </TableCell>
                            <TableCell className="px-4 py-2 text-left">
                                {/* Componente de Histórico */}
                                <EditarHistorico posicaoIcone="ml-6" uid={person.uid} />
                            </TableCell>
                            <TableCell className="px-4 py-2 text-left">
                                {/* Dropdown de Seleção de Equipe */}
                                <Select
                                    value={selectedEquipesMap[person.uid] || ""}
                                    onValueChange={(value: string) => onSelectTeam(person.uid, value)}>
                                    <SelectTrigger className="bg-white p-3 mt-3">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {allTeamsNames.map(teamName => (
                                            <SelectItem key={teamName} value={teamName}>{teamName}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            
                            <TableCell className="px-4 py-2 text-left">
                                {/* Botão de Atribuição */}
                                <Button variant="link" onClick={() => onAssignTeam(person.uid)} className="p-0">
                                    <UserCheck className="cursor-pointer hover:text-cyan-800 text-cyan-950" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};

export default EquipeSelectionTable;

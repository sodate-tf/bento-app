import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import TelaPerfil from "@/components/profile/TelaPerfil";
import EditarHistorico from "@/components/template/Equipe/MenuHistorico/EditarHistorico";
import { Trash2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';

// Define a interface para EquipeCampista, caso não seja globalmente disponível
interface EquipeCampista {
    uid: string;
    nome: string;
    // ... outras propriedades que sua equipeFake pode ter
}

interface TeamSummaryCollapsibleProps {
    /**
     * O nome da equipe a ser exibida (ex: 'LÍDERES').
     */
    teamName: string;
    /**
     * Array de UIDs dos membros desta equipe.
     */
    memberUids: string[];
    /**
     * Lista completa de todas as pessoas, usada para buscar os detalhes (nome, etc.) pelos UIDs.
     */
    allPeopleData: EquipeCampista[];
    /**
     * Callback acionado quando o usuário clica no ícone de lixeira para remover um membro.
     * @param uid - O UID do membro a ser removido.
     * @param teamName - O nome da equipe de onde o membro será removido.
     */
    onRemoveMember: (uid: string, teamName: string) => void;
    /**
     * Indica se a linha do cabeçalho do collapsible deve ter um estilo de "linha par" (opcional).
     */
    isEvenRow?: boolean;
}

/**
 * Componente que exibe uma única equipe em um formato recolhível (collapsible).
 * Mostra os membros da equipe e permite a remoção.
 */
const TeamSummaryCollapsible: React.FC<TeamSummaryCollapsibleProps> = ({
    teamName,
    memberUids,
    allPeopleData,
    onRemoveMember,
    isEvenRow = false,
}) => {
    return (
        <Collapsible className="mb-2">
            <CollapsibleTrigger className={`group flex w-full border-b border-gray-400 items-center justify-between 
                ${isEvenRow ? " bg-gray-300" : " bg-slate-200"} py-2 px-3 rounded-md hover:bg-gray-400 transition-colors`}>
                <h3 className="flex items-center gap-2 text-base pl-2 text-gray-900 font-semibold">
                    {teamName} - {memberUids.length || 0}
                </h3>
                <ChevronDown className="h-6 w-6 group-data-[state=open]:rotate-180 transition-transform text-gray-900" />
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-white border border-t-0 border-gray-300 rounded-b-lg overflow-hidden">
                <div className="container mx-auto py-4">
                    <Table className="min-w-full table-auto">
                        <TableHeader>
                            <TableRow className="text-xs bg-slate-400">
                                <TableHead className="px-4 py-2 text-left text-gray-700 w-5">UID</TableHead>
                                <TableHead className="px-4 py-2 text-left text-gray-700">NOME</TableHead>
                                <TableHead className="px-4 py-2 text-left text-gray-700 w-5">PERFIL</TableHead>
                                <TableHead className="px-4 py-2 text-left text-gray-700 w-5">HISTÓRICO</TableHead>
                                <TableHead className="px-4 py-2 text-left text-gray-700 w-5"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Exibe uma mensagem se a equipe estiver vazia */}
                            {memberUids.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="px-4 py-2 font-light text-center text-gray-500">
                                        Ninguém foi escolhido para a equipe {teamName}.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                // Mapeia e renderiza cada membro da equipe
                                memberUids.map((memberUid, i) => {
                                    const member = allPeopleData.find(item => item.uid === memberUid);
                                    if (!member) {
                                        // Caso um UID não seja encontrado na lista completa
                                        return (
                                            <TableRow key={`not-found-${memberUid}-${i}`} className="border-b hover:bg-gray-50">
                                                <TableCell colSpan={5} className="px-4 py-2 font-light text-center text-gray-500">
                                                    UID '{memberUid}' não encontrado na lista de pessoas.
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                    return (
                                        <TableRow key={member.uid} className={(i % 2 === 0) ? "bg-gray-300" : "bg-neutral-200"}>
                                            <TableCell className="px-4 py-2 font-light">{member.uid}</TableCell>
                                            <TableCell className="px-4 py-2 font-light whitespace-nowrap">{member.nome}</TableCell>
                                            <TableCell className="px-4 py-2 font-light">
                                                {/* Componente de Perfil (abre em uma Sheet) */}
                                                <Sheet>
                                                    <SheetTrigger asChild>
                                                        <Avatar className="cursor-pointer">
                                                            <AvatarImage src="https://github.com/shadcn.png" className="" />
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
                                            <TableCell className="px-4 py-2 font-light">
                                                {/* Componente de Histórico */}
                                                <EditarHistorico posicaoIcone="ml-6" uid={member.uid} />
                                            </TableCell>
                                            <TableCell className="px-4 py-2 font-light">
                                                {/* Ícone de Lixeira para remover o membro */}
                                                <Trash2
                                                    size={24}
                                                    className="text-red-950 cursor-pointer hover:text-red-700"
                                                    onClick={() => onRemoveMember(member.uid, teamName)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default TeamSummaryCollapsible;

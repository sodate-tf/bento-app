import Layout from "@/components/template/Layout";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { equipeFake, lideresFake, preInscricaoFake } from "../data/tabelasFake"; // Supondo que este caminho está correto

// Importar os novos componentes refatorados

import { exibirMsgAlerta } from "@/lib/utils";
import { IconeCheck, IconeExclamacao, IconeX } from "@/components/icons";
import EquipeSelectionTable from "@/components/separacao/tabelaSelecaoEquipe";
import TeamSummarySection from "@/components/separacao/resumoSelecaoEquipe";

// Define a interface para EquipeCampista, caso não seja globalmente disponível
interface EquipeCampista {
    uid: string;
    nome: string;
    // ... outras propriedades que sua equipeFake pode ter
}

// Constantes para os acampamentos e tipos de equipes de trabalho
const BENTOS_ATIVOS = ['II Bento 30+'];
const EQUIPES_DE_TRABALHO = [
    'FÉ',
    'CARIDADE',
    'JUSTIÇA',
    'FORTALEZA',
    'PRUDÊNCIA',
    'ESPERANÇA',
    'TEMPERANÇA'
];

/**
 * Componente principal para separar e gerenciar equipes.
 * Gerencia o estado da lista geral de pessoas e das equipes específicas.
 * Orquestra a exibição da tabela de seleção e do resumo das equipes.
 */
export default function SepararLideres() {
    // Estado para a lista geral de pessoas na equipe de trabalho, que será modificada
    const [equipeGeral, setEquipeGeral] = useState<EquipeCampista[]>(lideresFake);

    // Estados para cada equipe, tipados como string[] para UIDs
    const [fe, setfe] = useState<string[]>([]);
    const [caridade, setCaridade] = useState<string[]>([]);
    const [temperanca, setTemperanca] = useState<string[]>([]);
    const [fortaleza, setfortaleza] = useState<string[]>([]);
    const [prudencia, setPrudencia] = useState<string[]>([]);
    const [justica, setJustica] = useState<string[]>([]);
    const [esperanca, setEsperanca] = useState<string[]>([]);
    

    const [bentoAtivo, setBentoAtivo] = useState('II Bento 30+');
    // Estado para armazenar a equipe selecionada para cada pessoa no dropdown principal
    const [selectedEquipes, setSelectedEquipes] = useState<Record<string, string>>({});

    // Mapeamento de nomes de equipe para seus setters de estado para fácil acesso
    const setEquipeMap: Record<string, React.Dispatch<React.SetStateAction<string[]>>> = {
        'FÉ': setfe,
        'CARIDADE': setCaridade,
        'FORTALEZA': setfortaleza,
        'JUSTIÇA': setJustica,
        'PRUDÊNCIA': setPrudencia,
        'ESPERANÇA': setEsperanca,
        'TEMPERÂNÇA': setTemperanca,
    };

    // Mapeamento de nomes de equipe para os arrays de estado atuais para renderização no resumo
    const equipesAtivas: Record<string, string[]> = {
        'FÉ': fe,
        'CARIDADE': caridade,
        'FORTALEZA': fortaleza,
        'JUSTIÇA': justica,
        'PRUDÊNCIA': prudencia,
        'ESPERANÇA': esperanca,
        'TEMPERANÇA': temperanca
    };

    /**
     * Lida com a seleção de uma equipe para uma pessoa no dropdown principal.
     * Atualiza o estado `selectedEquipes`.
     * @param uid - O UID da pessoa.
     * @param equipe - O nome da equipe selecionada.
     */
    const handleSelectTeam = (uid: string, equipe: string) => {
        setSelectedEquipes(equipesAnteriores => ({
            ...equipesAnteriores,
            [uid]: equipe
        }));
        console.log(`[SELECIONOU EQUIPE] UID: ${uid}, Equipe: ${equipe}. State selectedEquipes atualizado.`);
    };

    /**
     * Lida com a atribuição de uma pessoa à equipe selecionada.
     * Remove a pessoa da `equipeGeral` e a adiciona à equipe específica.
     * Exibe mensagens de alerta para feedback ao usuário.
     * @param uid - O UID da pessoa a ser atribuída.
     */
    const handleAssignTeam = (uid: string) => {
        console.log(`[ADD EQUIPE] Botão clicado para UID: ${uid}`);
        const equipeSelecionadaParaUID = selectedEquipes[uid];

        if (!equipeSelecionadaParaUID) {
            exibirMsgAlerta('Essa pessoa ainda não tem equipe selecionada', 'yellow-900', IconeExclamacao);
            console.log(`[ADD EQUIPE] Nenhuma equipe selecionada para ${uid}.`);
            return;
        }

        const pessoa = preInscricaoFake.find(item => item.uid === uid); // Busca na lista COMPLETA de pessoas
        if (!pessoa) {
            exibirMsgAlerta(`Pessoa com UID ${uid} não encontrada.`, 'red-950', IconeX);
            return;
        }

        const setFunction = setEquipeMap[equipeSelecionadaParaUID];

        if (setFunction) {
            setFunction(prevEquipe => {
                // Garante que o UID não seja duplicado no array da equipe específica
                if (!prevEquipe.includes(uid)) {
                    exibirMsgAlerta(`Adicionando: ${pessoa.nome} à equipe: ${equipeSelecionadaParaUID}`, 'cyan-950', IconeCheck);
                    console.log(`[ADD EQUIPE - SET STATE] Adicionando '${uid}' a ${equipeSelecionadaParaUID}.`);

                    // Remove a pessoa da lista geral `equipeGeral`
                    setEquipeGeral(currentEquipe => currentEquipe.filter(member => member.uid !== uid));

                    return [...prevEquipe, uid]; // Retorna um NOVO array com o UID adicionado
                } else {
                    exibirMsgAlerta(`"${pessoa.nome}" já está na equipe ${equipeSelecionadaParaUID}.`, 'orange-500', IconeExclamacao);
                    console.log(`[ADD EQUIPE - SET STATE] '${uid}' já existe em ${equipeSelecionadaParaUID}.`);
                    return prevEquipe; // Retorna o array anterior para evitar re-render desnecessária
                }
            });
        } else {
            exibirMsgAlerta("Tipo de equipe desconhecido ou houve um erro interno.", "red-950", IconeX);
        }
    };

    /**
     * Lida com a remoção de uma pessoa de uma equipe específica.
     * Remove a pessoa da equipe específica e a adiciona de volta à `equipeGeral`.
     * Limpa a seleção do dropdown associada a essa pessoa.
     * @param uid - O UID da pessoa a ser removida.
     * @param equipeNome - O nome da equipe de onde a pessoa será removida.
     */
    const handleRemoveMember = (uid: string, equipeNome: string) => {
        console.log(`[REMOVE EQUIPE] Tentando remover UID: ${uid} da equipe: ${equipeNome}`);

        // 1. Remove a pessoa da equipe específica
        const setFunction = setEquipeMap[equipeNome];
        if (setFunction) {
            setFunction(prevEquipe => {
                const newEquipe = prevEquipe.filter(memberUid => memberUid !== uid);
                console.log(`[REMOVE EQUIPE - SET STATE] '${uid}' removido de '${equipeNome}'. Nova equipe:`, newEquipe);
                exibirMsgAlerta(`"${equipeFake.find(p => p.uid === uid)?.nome || uid}" foi removido(a) de ${equipeNome}.`, 'orange-500', IconeExclamacao);
                return newEquipe;
            });
        }

        // 2. Adiciona a pessoa de volta à lista geral `equipeGeral`
        const pessoaParaReAdicionar = equipeFake.find(item => item.uid === uid);
        if (pessoaParaReAdicionar) {
            setEquipeGeral(prevGeral => {
                // Garante que a pessoa não seja adicionada se já estiver lá
                if (!prevGeral.some(p => p.uid === uid)) {
                    console.log(`[REMOVE EQUIPE - SET STATE] Adicionando '${uid}' de volta à equipeGeral.`);
                    exibirMsgAlerta(`"${pessoaParaReAdicionar.nome}" foi adicionado(a) de volta à lista geral.`, 'green-700', IconeCheck);
                    // Adiciona de volta e ordena por nome para manter a consistência visual
                    const updatedGeral = [...prevGeral, pessoaParaReAdicionar];
                    return updatedGeral.sort((a, b) => a.nome.localeCompare(b.nome));
                }
                console.log(`[REMOVE EQUIPE - SKIP] '${uid}' já está na equipeGeral, não adicionando novamente.`);
                return prevGeral;
            });
        }

        // 3. Limpa a seleção do Dropdown para esta pessoa, caso ela estivesse selecionada antes de ser removida
        setSelectedEquipes(prevSelected => {
            if (prevSelected[uid]) {
                const newSelected = { ...prevSelected };
                delete newSelected[uid];
                console.log(`[REMOVE EQUIPE] Seleção para UID ${uid} limpa.`);
                return newSelected;
            }
            return prevSelected;
        });
    };

    // Efeito para depuração (opcional, pode remover em produção)
    useEffect(() => {
        console.log(">>> [USEEFFECT] Estado 'equipeGeral' atualizado:", equipeGeral.map(p => p.nome));
        Object.entries(equipesAtivas).forEach(([teamName, members]) => {
            if (members.length > 0) {
                console.log(`>>> [USEEFFECT] Equipe '${teamName}':`, members.map(uid => equipeFake.find(p => p.uid === uid)?.nome));
            }
        });
        console.log(">>> [USEEFFECT] Estado 'selectedEquipes' atualizado:", selectedEquipes);
    }, [equipeGeral, selectedEquipes, fe, caridade, esperanca, temperanca, justica, fortaleza, prudencia]);

    return (
        <Layout titulo="Separar Equipe" subTitulo="Escolha a equipe de cada membro da equipe">
            <div className="flex flex-col w-full bg-gray-200 p-3">
                <div className="flex flex-col">
                    <Label className="mb-2">Selecione o Acampamento:</Label>
                    <Select
                        value={bentoAtivo}
                        onValueChange={(value: string) => setBentoAtivo(value)}>
                        <SelectTrigger className="bg-white p-3 mt-3">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {BENTOS_ATIVOS.map(state => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Componente da Tabela de Seleção */}
                    <EquipeSelectionTable
                        peopleToSelect={equipeGeral}
                        allTeamsNames={EQUIPES_DE_TRABALHO}
                        selectedEquipesMap={selectedEquipes}
                        onSelectTeam={handleSelectTeam}
                        onAssignTeam={handleAssignTeam}
                    />
                </div>

                <Separator className="m-5" />

                {/* Componente da Seção de Resumo das Equipes */}
                <TeamSummarySection
                    allTeamsNames={EQUIPES_DE_TRABALHO}
                    teamsData={equipesAtivas}
                    allPeopleData={equipeFake} // Passa a lista completa para lookup de nomes
                    onRemoveMember={handleRemoveMember}
                />
            </div>
        </Layout>
    );
}

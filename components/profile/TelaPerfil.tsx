// components/profile/TelaPerfil.tsx
"use client"; // Necessário para usar hooks do React no App Router

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Para App Router
// import { useRouter } from 'next/router'; // Use esta linha se estiver no Pages Router

import Image from "next/image"; // Verifique se está usando este import em algum lugar, senão pode remover
import { toast } from "sonner";
import { Input } from "../ui/input"; // Verifique se está usando este import em algum lugar, senão pode remover
import BarraDeProgresso from "../BarraDeProgresso";
import InformacoesBasicas from "./sessao/InformacoesBasicas";
import InformacoesPessoais from "./sessao/InformacoesPessoais";
import Endereco from "./sessao/Endereco";
import ParoquiaSacramentos from "./sessao/ParoquiaSacramentos";
import InformacoesEmergencia from "./sessao/InformacoesEmergencia";
import InformacoesContatoEmergencia from "./sessao/InformacoesContatoEmergencia";
import { Button } from "../ui/button";
import pessoaService, { PessoaApiData } from "@/src/service/pessoaService";
import { IconeCheck, IconeX } from "../icons";
import { exibirMsgAlerta } from "@/lib/utils"; // Assumindo que exibirMsgAlerta é uma função global
import ImagemPerfil from './sessao/ImagemPerfil'; // Seu componente ImagemPerfil/ImagemUploader
import { initialUserProfile } from '@/src/types/userProfile'; // Garanta que initialUserProfile esteja corretamente definido e exportado

// Mantendo a interface TelaPerfilProps para receber o UID e o novo parâmetro
interface TelaPerfilProps {
    uid?: string; // UID é opcional, usado para carregar perfis existentes
    novo?: boolean; // Novo parâmetro: true para novo cadastro, false/undefined para editar existente
}

export default function TelaPerfil(props: TelaPerfilProps) {
    const router = useRouter();

    // 1. Inicialização Condicional do userProfile:
    //    - Se `props.novo` for true, inicializa com `initialUserProfile` (formulário vazio para novo cadastro).
    //    - Se `props.novo` for false ou undefined, inicializa com `null` (indicando que o perfil será carregado).
    const [userProfile, setUserProfile] = useState<PessoaApiData | null>(
        props.novo ? initialUserProfile : null
    );

    // 2. Inicialização Condicional do Loading:
    //    - Se `props.novo` for true, não há nada para carregar, então `loading` começa como `false`.
    //    - Caso contrário (perfil existente), `loading` começa como `true` para indicar a busca.
    const [loading, setLoading] = useState<boolean>(!props.novo);
    const [error, setError] = useState<string | null>(null);

    // Calcula a porcentagem de conclusão (usando userProfile, se não for null)
    const completionPercentage = useCallback(
        () => userProfile ? calculateCompletionPercentage(userProfile) : 0,
        [userProfile]
    );

    // Handler genérico para atualização de campos do perfil
    const handleProfileChange = useCallback(<K extends keyof PessoaApiData>(field: K, value: PessoaApiData[K]) => {
        setUserProfile(prevProfile => {
            if (!prevProfile) {
                console.warn(`Tentativa de atualizar o campo '${String(field)}' quando userProfile é nulo.`);
                return null;
            }
            return {
                ...prevProfile,
                [field]: value,
            };
        });
    }, []);

    // 3. NOVO: useEffect para buscar o perfil APENAS se não for um novo cadastro
    useEffect(() => {
        // A busca só ocorre se `props.novo` não for verdadeiro e um `uid` for fornecido
        if (!props.novo && props.uid) {
            const fetchProfile = async () => {
                setLoading(true);
                setError(null);
                try {
                    const perfil = await pessoaService.getPessoaById(+props.uid);
                    if (perfil) {
                        setUserProfile(perfil);
                        toast.success("Perfil carregado com sucesso!", { description: perfil.nome_completo });
                    } else {
                        setError(`Usuário com UID ${props.uid} não encontrado ou dados indisponíveis.`);
                        setUserProfile(null);
                    }
                } catch (err: any) {
                    console.error("Erro inesperado ao buscar perfil na TelaPerfil:", err);
                    setError(err.message || "Ocorreu um erro desconhecido ao carregar o perfil.");
                    setUserProfile(null);
                } finally {
                    setLoading(false);
                }
            };
            fetchProfile();
        }
    }, [props.uid, props.novo]);

    // Handler para salvar o perfil
    const handleSaveProfile = async () => {
        if (!userProfile) {
            exibirMsgAlerta("Nenhum perfil para salvar. Preencha os campos para criar ou atualizar.", 'bg-yellow-500', IconeX);
            return;
        }

        try {
            if (props.novo) {
                const newProfile = await pessoaService.create(userProfile);
                if (newProfile) {
                    toast.success("Perfil criado com sucesso!", {
                        description: `Sua conclusão está em ${Math.round(completionPercentage())}%`,
                    });
                    router.push(`/equipe/${newProfile.uid}`);
                } else {
                    exibirMsgAlerta("Falha ao criar perfil.", 'bg-red-950', IconeX);
                }
            } else {
                if (!userProfile.uid) {
                    exibirMsgAlerta("ID do perfil ausente para atualização.", 'bg-red-950', IconeX);
                    return;
                }
                await pessoaService.update(userProfile.uid, userProfile);
                toast.success("Perfil atualizado com sucesso!", {
                    description: `Sua conclusão está em ${Math.round(completionPercentage())}%`,
                });
            }
        } catch (error: any) {
            console.error("Erro ao salvar perfil:", error);
            const errorMessage = error.message || "Erro ao salvar o perfil. Verifique os dados e tente novamente.";
            exibirMsgAlerta(errorMessage, 'bg-red-950', IconeX);
        }
    };

    // --- Renderização condicional para estados de carregamento/erro/não encontrado ---
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <p className="text-xl text-gray-700 dark:text-gray-300">Carregando perfil...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200 p-4">
                <h1 className="text-3xl font-bold mb-4">Erro ao Carregar Perfil</h1>
                <p className="text-lg mb-6">{error}</p>
                <button
                    onClick={() => router.push('/equipe')}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
                >
                    Voltar para a Equipe
                </button>
            </div>
        );
    }

    if (!userProfile) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
                <h1 className="text-3xl font-bold mb-4">Perfil Não Disponível</h1>
                <p className="text-lg mb-6">Não foi possível carregar os dados do usuário. Tente novamente mais tarde.</p>
                <button
                    onClick={() => router.push('/equipe')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
                >
                    Voltar para a Equipe
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-300 to-slate-300 p-2 md:p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
                {/* Cabeçalho do Perfil */}
                <div className="relative bg-gray-800 text-white p-1 md:p-2 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* CORREÇÃO AQUI: Voltando a passar a propriedade 'profile' completa */}
                        <ImagemPerfil onProfileChange={handleProfileChange} profile={userProfile} />
                        <BarraDeProgresso percentage={completionPercentage()} size={65} strokeWidth={8} progressColor="#ef4444" textColor="#f9fafb" circleColor="#6b7280" />
                    </div>
                </div>

                {/* Formulário de Seções */}
                <div className="p-1 md:p-2 space-y-8">
                    <InformacoesBasicas profile={userProfile} onProfileChange={handleProfileChange} />
                    <InformacoesPessoais profile={userProfile} onProfileChange={handleProfileChange} />
                    <Endereco profile={userProfile} onProfileChange={handleProfileChange} />
                    <ParoquiaSacramentos profile={userProfile} onProfileChange={handleProfileChange} />
                    <InformacoesEmergencia profile={userProfile} onProfileChange={handleProfileChange} />
                    <InformacoesContatoEmergencia profile={userProfile} onProfileChange={handleProfileChange} />
                </div>

                {/* Botão Salvar */}
                <div className="p-6 md:p-8 border-t border-gray-200 flex justify-end">
                    <Button onClick={handleSaveProfile} className="bg-cyan-950 hover:bg-cyan-700 rounded-none text-white px-8 py-3 text-lg font-semibold shadow-md transition-colors">
                        Salvar Perfil
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Função calculateCompletionPercentage (mantida como fornecido)
const calculateCompletionPercentage = (profile: PessoaApiData): number => {
    let filledFields = 0;
    let totalFields = 1;

    totalFields += 5;
    if (profile.nome_completo) filledFields++;
    if (profile.telefone) filledFields++;
    if (profile.email) filledFields++;
    if (profile.cpf) filledFields++;
    if (profile.instagram) filledFields++;

    totalFields += 4;
    if (profile.peso !== undefined && profile.peso !== null && profile.peso !== 0) filledFields++;
    if (profile.altura !== undefined && profile.altura !== null && profile.altura !== 0) filledFields++;
    if (profile.camiseta) filledFields++;
    if (profile.profissao) filledFields++;

    totalFields += 2;
    if (profile.data_nascimento) filledFields++;
    if (profile.estado_civil) filledFields++;

    totalFields += 7;
    if (profile.cep) filledFields++;
    if (profile.rua) filledFields++;
    if (profile.numero) filledFields++;
    if (profile.complemento) filledFields++;
    if (profile.bairro) filledFields++;
    if (profile.cidade) filledFields++;
    if (profile.estado) filledFields++;

    totalFields += 1;
    if (profile.paroquia) filledFields++;
    totalFields += 4;
    if (profile.batizado !== undefined && profile.batizado !== null) filledFields++;
    if (profile.eucaristia !== undefined && profile.eucaristia !== null) filledFields++;
    if (profile.crisma !== undefined && profile.crisma !== null) filledFields++;
    if (profile.matrimonio !== undefined && profile.matrimonio !== null) filledFields++;

    totalFields += 5;
    if (profile.alergia !== undefined && profile.alergia !== null) filledFields++;
    if (profile.doenca_cronica !== undefined && profile.doenca_cronica !== null) filledFields++;
    if (profile.tratamento_medico !== undefined && profile.tratamento_medico !== null) filledFields++;
    if (profile.medicamento_controlado !== undefined && profile.medicamento_controlado !== null) filledFields++;
    if (profile.plano_de_saude !== undefined && profile.plano_de_saude !== null) filledFields++;

    if (profile.alergia && profile.qual_alergia) filledFields++;
    if (profile.doenca_cronica && profile.qual_doenca) filledFields++;
    if (profile.tratamento_medico && profile.qual_tratamento) filledFields++;
    if (profile.medicamento_controlado && profile.qual_medicamento) filledFields++;
    if (profile.plano_de_saude && profile.qual_plano) filledFields++;

    totalFields += 2;
    if (profile.contato_emergencia) filledFields++;
    if (profile.telefone_emergencia) filledFields++;

    if (profile.url_foto_perfil) filledFields++;

    if (totalFields === 0) return 0;

    return (filledFields / totalFields) * 100;
};

// frontend/src/components/template/Acampas/Acampamentos.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react"; // Adicionado useRef
import DataTableAcampas from "@/components/template/Acampas/DataTableAcampas";
import FormCadastroAcampa from "@/components/template/Acampas/FormCadastroAcampamento";
import Layout from "@/components/template/Layout";
import { Button } from "@/components/ui/button";
import { Acampamento as AcampamentoClass } from "@/components/dataTable/Acampamentos/columns"; // Importe a interface/classe Acampamento
import acampamentoService, { AcampamentoApiData } from "@/src/service/acampamentoService"; // Importe o serviço da API
import { IconeCheck, IconeExclamacao } from "@/components/icons";
import { exibirMsgAlerta } from "@/lib/utils";

// Placeholder para o seu sistema de notificação (Toast/Alert)
// Certifique-se de que IconeCheck e IconeExclamacao são componentes React (SVG, Lucide, etc.)

export default function Acampamentos() {
    const [formVisivel, setFormVisivel] = useState<boolean>(false);
    const [acampamentoSelecionado, setAcampamentoSelecionado] = useState<AcampamentoClass | null>(null);
    const [modoForm, setModoForm] = useState<'cadastro' | 'edicao'>('cadastro');
    const [messageState, setMessageState] = useState(null);
    const dataTableRef = useRef<{ refreshData: () => Promise<void> }>(null); // Ref para chamar o método de refresh da DataTable


    // Função para fechar a notificação
    const closeNotification = useCallback(() => {
        setMessageState(null);
    }, []);

    // --- Funções de Ação ---

    // Abre o formulário para um novo cadastro
    const novoAcampa = useCallback(() => {
        setAcampamentoSelecionado(null); // Limpa qualquer seleção anterior
        setModoForm('cadastro');
        setFormVisivel(true);
    }, []);

    // Função chamada quando um acampamento é selecionado para edição
    const editarAcampamento = useCallback((acampamento: AcampamentoClass) => {
        setAcampamentoSelecionado(acampamento);
        setModoForm('edicao');
        setFormVisivel(true);
    }, []);

    // Função para excluir um acampamento
    const excluirAcampamento = useCallback(async (uid: string) => {
        if (confirm(`Tem certeza que deseja excluir o acampamento ${uid}?`)) {
            try {
                await acampamentoService.delete(parseInt(uid)); // Assume que o UID é um número
                exibirMsgAlerta("Acampamento excluído com sucesso!", 'green-950', IconeCheck);
                // Atualiza a tabela após a exclusão
                if (dataTableRef.current) {
                    await dataTableRef.current.refreshData();
                }
            } catch (error) {
                console.error("Erro ao excluir acampamento:", error);
                exibirMsgAlerta("Erro ao excluir acampamento. Verifique o console.", 'red-950', IconeExclamacao);
            }
        }
    }, [exibirMsgAlerta]);

    // Função chamada pelo formulário após salvar/atualizar
    const salvarAcampamento = useCallback(async (acampamentoData: AcampamentoApiData) => {
        try {
            if (modoForm === 'cadastro') {
                await acampamentoService.create(acampamentoData);
                exibirMsgAlerta("Acampamento cadastrado com sucesso!", 'cyan-950', IconeCheck);
            } else { // modoForm === 'edicao'
                if (acampamentoSelecionado && acampamentoSelecionado.uid) {
                    await acampamentoService.update(parseInt(acampamentoSelecionado.uid), acampamentoData);
                    exibirMsgAlerta("Acampamento atualizado com sucesso!", 'green-950', IconeCheck);
                } else {
                    throw new Error("UID do acampamento não encontrado para atualização.");
                }
            }
            setFormVisivel(false); // Esconde o formulário
            setAcampamentoSelecionado(null); // Limpa a seleção
            // Atualiza a tabela após a operação de salvar/atualizar
            if (dataTableRef.current) {
                await dataTableRef.current.refreshData();
            }
        } catch (error: any) {
            exibirMsgAlerta(`Erro ao salvar acampamento: ${error.message || 'Erro desconhecido'}`, 'bg-red-950', IconeExclamacao);
        }
    }, [modoForm, acampamentoSelecionado, exibirMsgAlerta]);


    // Função para cancelar o formulário
    const clickCancelar = useCallback(() => {
        setFormVisivel(false);
        setAcampamentoSelecionado(null); // Limpa a seleção ao cancelar
    }, []);

    return (
        <Layout titulo="Gerenciar Acampamentos" subTitulo="Cadastre e gerencie seus acampamentos">
            <div className="flex flex-col w-full bg-gray-200 p-3 rounded-lg shadow-md">
                <div className="flex justify-end mb-4"> {/* Botão de novo alinhado à direita */}
                    {!formVisivel && (
                        <Button
                            className="bg-cyan-800 hover:bg-cyan-600 text-white cursor-pointer px-6 py-2 rounded-md"
                            onClick={novoAcampa}
                        >
                            Novo Acampamento
                        </Button>
                    )}
                </div>

                {formVisivel ? (
                    // Passa o acampamento selecionado e as funções de callback para o formulário
                    <FormCadastroAcampa
                        acampamento={acampamentoSelecionado}
                        onSave={salvarAcampamento}
                        onCancel={clickCancelar}
                    />
                ) : (
                    // Passa as funções de editar e excluir para a DataTable
                    <DataTableAcampas
                        onEdit={editarAcampamento}
                        onDelete={excluirAcampamento}
                        // Passa a função de alerta e ícones para o DataTable para o copiar link
                        onShowAlert={exibirMsgAlerta}
                        ref={dataTableRef} // Anexa a ref aqui
                    />
                )}
            </div>
        </Layout>
    );
}

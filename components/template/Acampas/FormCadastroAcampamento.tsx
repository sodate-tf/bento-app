"use client"; // ESTA É A PRIMEIRA E MAIS IMPORTANTE LINHA!

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

// Importa os componentes de seção do formulário
import AcampamentoGeralForm from "./AcampamentoGeralForm";
import AcampamentoPagamentoForm from "./AcampamentoPagamentoForm";
import AcampamentoMidiaForm from "./AcampamentoMidiaForm";
import AcampamentoStatusForm from "./AcampamentoStatusForm";

// Importa a interface/classe Acampamento usada na DataTable para tipagem de props
import { Acampamento as AcampamentoClass } from "@/components/dataTable/Acampamentos/columns";

// Define a interface para as props de FormCadastroAcampamento
interface FormCadastroAcampaProps {
    acampamento?: AcampamentoClass; // Acampamento opcional para edição
    onSave: (formData: FormData, isUpdate: boolean, uid?: string) => void; // Função para salvar
    onCancel: () => void; // Função para cancelar
}
// --- GARANTA QUE ESTA INTERFACE ESTEJA PRESENTE E CORRETAMENTE ESCRITA ---
interface FormCadastroAcampamentoProps { // <-- Esta é a interface que o TypeScript não está encontrando
    acampamento?: AcampamentoClass; // Acampamento opcional para edição
    onSave: (formData: FormData, isUpdate: boolean, uid?: string) => void; // Função para salvar
    onCancel: () => void; // Função para cancelar
}
/**
 * Componente principal para cadastro e edição de acampamentos.
 * Orquestra a exibição e o gerenciamento do estado dos sub-componentes do formulário.
 */
export default function FormCadastroAcampa({ acampamento, onSave, onCancel }: FormCadastroAcampamentoProps) {
    // Estados locais para os campos do formulário
    const [uid, setUid] = useState<string>('');
    const [nome_acampa, setNomeAcampa] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [data_inicio, setDataInicio] = useState<string>('');
    const [data_final, setDataFinal] = useState<string>('');
    const [local, setLocal] = useState<string>('');
    const [taxa_equipe, setTaxaEquipe] = useState<string>('0.00');
    const [taxa_externa, setTaxaExterna] = useState<string>('0.00');
    const [taxa_campista, setTaxaCampista] = useState<string>('0.00');
    const [chave_pix, setChavePix] = useState<string>('');
    const [url_link_pagamento, setUrlLinkPagamento] = useState<string>('');
    const [musica_tema, setMusicaTema] = useState<string>('');
    const [leitura_tema, setLeituraTema] = useState<string>('');
    
    // Estados para os arquivos
    const [existingCronogramaPath, setExistingCronogramaPath] = useState<string>('');
    const [newCronogramaFile, setNewCronogramaFile] = useState<File | null>(null);

    const [existingArteCamisetaPath, setExistingArteCamisetaPath] = useState<string>('');
    const [newArteCamisetaFile, setNewArteCamisetaFile] = useState<File | null>(null);

    const [existingCardapioPath, setExistingCardapioPath] = useState<string>('');
    const [newCardapioFile, setNewCardapioFile] = useState<File | null>(null);

    const [is_ativo, setIsAtivo] = useState<boolean>(true);

    // Estado para erros de validação
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Efeito para preencher o formulário quando um acampamento for passado (modo edição)
    useEffect(() => {
        if (acampamento) {
            setUid(acampamento.uid || '');
            setNomeAcampa(acampamento.nome || '');
            setSlug(acampamento.slug || '');
            setDataInicio(acampamento.dataInicio ? acampamento.dataInicio.toISOString().split('T')[0] : '');
            setDataFinal(acampamento.dataFinal ? acampamento.dataFinal.toISOString().split('T')[0] : '');
            setLocal(acampamento.local || '');
           // --- CORREÇÃO AQUI: PARSE PARA FLOAT ANTES DE TOFIXED ---
            // Garante que o valor é um número (ou NaN) antes de usar toFixed
            const equipeValue = parseFloat(String(acampamento.taxa_equipe));
            setTaxaEquipe(isNaN(equipeValue) ? '0.00' : equipeValue.toFixed(2));

            const externaValue = parseFloat(String(acampamento.taxa_externa));
            setTaxaExterna(isNaN(externaValue) ? '0.00' : externaValue.toFixed(2));

            const campistaValue = parseFloat(String(acampamento.taxa_campista));
            setTaxaCampista(isNaN(campistaValue) ? '0.00' : campistaValue.toFixed(2));
            // --- FIM DA CORREÇÃO ---
            setChavePix(acampamento.chave_pix || '');
            setUrlLinkPagamento(acampamento.url_link_pagamento || '');
            setMusicaTema(acampamento.musica_tema || '');
            setLeituraTema(acampamento.leitura_tema || '');
            
            setExistingCronogramaPath(acampamento.cronograma || '');
            setExistingArteCamisetaPath(acampamento.arte_camiseta || '');
            setExistingCardapioPath(acampamento.cardapio || '');

            // Limpa novos arquivos selecionados ao carregar para edição
            setNewCronogramaFile(null);
            setNewArteCamisetaFile(null);
            setNewCardapioFile(null);

            setIsAtivo(acampamento.is_ativo);
        } else {
            // Reseta o formulário para um novo acampamento
            setUid('');
            setNomeAcampa('');
            setSlug('');
            setDataInicio('');
            setDataFinal('');
            setLocal('');
            setTaxaEquipe('0.00');
            setTaxaExterna('0.00');
            setTaxaCampista('0.00');
            setChavePix('');
            setUrlLinkPagamento('');
            setMusicaTema('');
            setLeituraTema('');
            
            setExistingCronogramaPath('');
            setNewCronogramaFile(null);
            setExistingArteCamisetaPath('');
            setNewArteCamisetaFile(null);
            setExistingCardapioPath('');
            setNewCardapioFile(null);

            setIsAtivo(true);
        }
        setErrors({}); // Limpa erros ao inicializar/redefinir o formulário
    }, [acampamento]);

    // Função de validação do formulário
    const validateForm = useCallback(() => {
        let currentErrors: { [key: string]: string } = {};
        let isValid = true;

        if (!nome_acampa.trim()) {
            currentErrors.nome_acampa = 'Nome do acampamento é obrigatório.';
            isValid = false;
        }
        if (!slug.trim()) {
            currentErrors.slug = 'Slug é obrigatório.';
            isValid = false;
        }
        if (!data_inicio) {
            currentErrors.data_inicio = 'Data de início é obrigatória.';
            isValid = false;
        }
        if (!data_final) {
            currentErrors.data_final = 'Data final é obrigatória.';
            isValid = false;
        } else if (data_inicio && new Date(data_final) < new Date(data_inicio)) {
            currentErrors.data_final = 'Data final não pode ser anterior à data de início.';
            isValid = false;
        }
        if (!local.trim()) {
            currentErrors.local = 'Local é obrigatório.';
            isValid = false;
        }
        const campistaNum = parseFloat(taxa_campista);
        if (isNaN(campistaNum) || campistaNum < 0) {
            currentErrors.taxa_campista = 'Taxa do campista inválida.';
            isValid = false;
        }
        const equipeNum = parseFloat(taxa_equipe);
        if (isNaN(equipeNum) || equipeNum < 0) {
            currentErrors.taxa_equipe = 'Taxa da equipe inválida.';
            isValid = false;
        }
        const externaNum = parseFloat(taxa_externa);
        if (isNaN(externaNum) || externaNum < 0) {
            currentErrors.taxa_externa = 'Taxa externa inválida.';
            isValid = false;
        }

        setErrors(currentErrors);
        return isValid;
    }, [nome_acampa, slug, data_inicio, data_final, local, taxa_campista, taxa_equipe, taxa_externa]);


    // Função para lidar com o envio do formulário
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            console.error("Formulário inválido. Verifique os campos com erro.");
            return;
        }

        const formData = new FormData();

        // Adiciona todos os campos ao FormData
        formData.append('is_ativo', String(is_ativo));
        formData.append('nome_acampa', nome_acampa);
        formData.append('slug', slug);
        formData.append('data_inicio', data_inicio);
        formData.append('data_final', data_final);
        formData.append('local', local);
        formData.append('taxa_equipe', String(parseFloat(taxa_equipe)));
        formData.append('taxa_externa', String(parseFloat(taxa_externa)));
        formData.append('taxa_campista', String(parseFloat(taxa_campista)));
        formData.append('chave_pix', chave_pix);
        formData.append('url_link_pagamento', url_link_pagamento);
        formData.append('musica_tema', musica_tema);
        formData.append('leitura_tema', leitura_tema);

        // Lida com os arquivos
        if (newCronogramaFile) {
            formData.append('cronograma', newCronogramaFile);
        } else if (existingCronogramaPath) {
            formData.append('cronograma', existingCronogramaPath); // Reenvia o caminho existente se nenhum novo arquivo for selecionado
        } else {
            formData.append('cronograma', ''); // Limpa se não houver nenhum arquivo
        }

        if (newArteCamisetaFile) {
            formData.append('arte_camiseta', newArteCamisetaFile);
        } else if (existingArteCamisetaPath) {
            formData.append('arte_camiseta', existingArteCamisetaPath);
        } else {
            formData.append('arte_camiseta', '');
        }

        if (newCardapioFile) {
            formData.append('cardapio', newCardapioFile);
        } else if (existingCardapioPath) {
            formData.append('cardapio', existingCardapioPath);
        } else {
            formData.append('cardapio', '');
        }
        
        // Determina se é uma atualização ou novo cadastro
        const isUpdate = !!acampamento?.uid;
        console.log(formData)
        onSave(formData, isUpdate, acampamento?.uid);
    };

    // Função genérica para limpar o arquivo (existente ou novo)
    const handleClearExistingFile = useCallback((field: 'cronograma' | 'arte_camiseta' | 'cardapio') => {
        if (field === 'cronograma') {
            setExistingCronogramaPath('');
            setNewCronogramaFile(null);
        } else if (field === 'arte_camiseta') {
            setExistingArteCamisetaPath('');
            setNewArteCamisetaFile(null);
        } else if (field === 'cardapio') {
            setExistingCardapioPath('');
            setNewCardapioFile(null);
        }
    }, []);

    return (
  
        <div className="flex flex-col p-4 sm:p-6 bg-white rounded-lg shadow-xl w-full max-w-full sm:max-w-2xl md:max-w-4xl border border-gray-200 overflow-hidden min-w-0">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
                {acampamento ? 'Editar Acampamento' : 'Novo Acampamento'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
                {/* Seção de Informações Gerais */}
                <AcampamentoGeralForm
                    nome_acampa={nome_acampa} setNomeAcampa={setNomeAcampa}
                    slug={slug} setSlug={setSlug}
                    data_inicio={data_inicio} setDataInicio={setDataInicio}
                    data_final={data_final} setDataFinal={setDataFinal}
                    local={local} setLocal={setLocal}
                    errors={errors}
                />

                {/* Seção de Valores e Pagamento */}
                <AcampamentoPagamentoForm
                    taxa_equipe={taxa_equipe} setTaxaEquipe={setTaxaEquipe}
                    taxa_externa={taxa_externa} setTaxaExterna={setTaxaExterna}
                    taxa_campista={taxa_campista} setTaxaCampista={setTaxaCampista}
                    chave_pix={chave_pix} setChavePix={setChavePix}
                    url_link_pagamento={url_link_pagamento} setUrlLinkPagamento={setUrlLinkPagamento}
                    errors={errors}
                />

                {/* Seção de Conteúdo e Mídias */}
                <AcampamentoMidiaForm
                    musica_tema={musica_tema} setMusicaTema={setMusicaTema}
                    leitura_tema={leitura_tema} setLeituraTema={setLeituraTema}
                    existingCronogramaPath={existingCronogramaPath} newCronogramaFile={newCronogramaFile} setNewCronogramaFile={setNewCronogramaFile} onClearCronograma={() => handleClearExistingFile('cronograma')}
                    existingArteCamisetaPath={existingArteCamisetaPath} newArteCamisetaFile={newArteCamisetaFile} setNewArteCamisetaFile={setNewArteCamisetaFile} onClearArteCamiseta={() => handleClearExistingFile('arte_camiseta')}
                    existingCardapioPath={existingCardapioPath} newCardapioFile={newCardapioFile} setNewCardapioFile={setNewCardapioFile} onClearCardapio={() => handleClearExistingFile('cardapio')}
                    errors={errors}
                />

                {/* Seção de Status do Acampamento */}
                <AcampamentoStatusForm
                    is_ativo={is_ativo} setIsAtivo={setIsAtivo}
                />

                {/* Botões de Ação */}
                <div className="col-span-full flex flex-col sm:flex-row justify-end gap-3 mt-6">
                    <Button
                        type="submit"
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-md shadow-md transition-colors duration-200"
                    >
                        {acampamento ? 'Salvar Alterações' : 'Cadastrar Acampamento'}
                    </Button>
                    <Button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 sm:flex-none bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-6 rounded-md shadow-md transition-colors duration-200"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
   
    );
}

// pages/equipe/index.tsx ou app/equipe/[uid]/page.tsx (se for rota dinâmica)
// Para Pages Router, router.query já pega o uid.
// Se for App Router, você precisaria de useParams() para pegar o uid.
// Para fins de exemplo, estou assumindo Pages Router devido ao import 'next/router'

import { IconeCheck, IconeLoad, IconeX } from "@/components/icons";
import TelaPerfil from "@/components/profile/TelaPerfil"; // TelaPerfil vai lidar com o próprio carregamento
import Layout from "@/components/template/Layout";
import { exibirMsgAlerta } from "@/lib/utils"; // Assumindo que esta é uma função global que dispara alertas
import { useRouter } from "next/router"; // Para Pages Router
import { useEffect, useState } from "react";
// import { toast } from "sonner"; // Não mais diretamente usado aqui se exibirMsgAlerta cuida

export default function Equipe() {
    const router = useRouter();
    // No Pages Router, 'uid' vem da query string. Se a rota é `/equipe?uid=123`
    // ou se a rota é dinâmica como `/equipe/[uid].tsx` e você acessa `/equipe/123`.
    const { uid } = router.query; 

    // Estado para o UID, garantindo que seja uma string
    const [profileUid, setProfileUid] = useState<string | null>(null);

    // useEffect para pegar o UID da URL assim que o router estiver pronto
    useEffect(() => {
        if (router.isReady && uid) {
            // Se o UID vem como string ou array de strings, pegue o primeiro elemento
            setProfileUid(Array.isArray(uid) ? uid[0] : uid);
        } else if (router.isReady && !uid) {
            // Se o router está pronto mas não há UID na query, redireciona
            // Isso pode acontecer se a página /equipe for acessada sem um UID
            exibirMsgAlerta("UID do usuário não fornecido. Redirecionando...", 'bg-amber-500', IconeX);
            router.push('/equipe'); // Redireciona para a página principal da equipe
        }
    }, [router.isReady, uid, router]);

    // O componente TelaPerfil agora é responsável por carregar seus próprios dados
    // com base no 'profileUid' que é passado para ele.
    // Enquanto o profileUid não estiver disponível, ou o componente TelaPerfil
    // estiver carregando, ele exibirá seu próprio estado de carregamento/erro.
    if (!profileUid) {
        // Exibe um carregamento simples enquanto espera o UID da URL
        return (
            <Layout titulo="Carregando" subTitulo="Preparando o perfil...">
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-600">Aguardando UID do perfil...</p>
                    {/* Opcionalmente exibir um spinner aqui */}
                </div>
            </Layout>
        );
    }

    return (
        <Layout titulo={"Gerenciar Perfil"} subTitulo="Gerencie aqui o perfil selecionado">
            <div className="flex flex-col w-full bg-gray-200 p-3 relative ">
                {/* TelaPerfil recebe o UID e se encarrega de tudo */}
                <TelaPerfil uid={profileUid} /> 
            </div>
        </Layout>
    );
}
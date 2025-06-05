import { IconeCheck, IconeLoad, IconeX } from "@/components/icons";
import FormCadastroEquipe from "@/components/template/Equipe/FormCadastroEquipe";
import Layout from "@/components/template/Layout";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function Equipe() { 
  function clickCancelar(){
    // redirecionar para equipe/index.tsx
  }
    const router = useRouter();
    const { uid } = router.query;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
        if (uid) { // Certifica-se de que uid não é undefined antes de tentar buscar dados
        const fetchUserData = async () => {
            try {
            setLoading(true);
            setError(null);
            // Aqui você faria sua lógica para buscar os dados do usuário
            // Por exemplo, de uma API ou de um array local
            const data = await new Promise(resolve => {
                setTimeout(() => {
                // Simulando a busca de dados
                const allUsers = [
                    { uid: '1', nome: 'Fabiano Teodoro Sodate', dataNascimento: '02/06/1988', celular: '(18) 99163-1099' },
                    { uid: '2', nome: 'Ana Carolina Pereira', dataNascimento: '15/01/1990', celular: '(11) 98765-4321' },
                    // ... outros usuários
                ];
                const foundUser = allUsers.find(user => user.uid === uid);
                resolve(foundUser);
                }, 500); // Atraso de 500ms para simular uma requisição de rede
            });

            if (data) {
                setUserData(data);
            } else {
                setError(`Usuário com UID ${uid} não encontrado.`);
            }
            } catch (err) {
            setError('Erro ao carregar os dados do usuário.');
            console.error(err);
            } finally {
            setLoading(false);
            }
        };

        fetchUserData();
        }
    }, [uid]); // O efeito será reexecutado se o uid mudar

    if (router.isFallback) {
        // Para rotas com getStaticPaths (SSG)
        toast("Carregando!", {
        className: "bg-cyan-900 text-white shadow-lg p-10 flex",
        unstyled: true,
        invert: false,
        icon: IconeLoad
       })
       
    }

    if (loading) {
        toast("Carregando dados do usuário...", {
        className: "bg-cyan-900 text-white shadow-lg p-10 flex",
        unstyled: true,
        invert: false,
        icon: IconeLoad
       })
       
    }

    if (error) {
        toast(`Erro: ${error}`, {
        className: "bg-red-900 text-white shadow-lg p-10 flex",
        unstyled: true,
        invert: false,
        icon: IconeX
       })
       
    }
  return (
    <Layout titulo={"Gerenciar: "+userData?.nome} subTitulo="Gerencie aqui a equipe de trabalho">
      <div className="flex flex-col w-full bg-gray-200 p-3 ">
          <FormCadastroEquipe clickCancelar={clickCancelar} uid={""+uid}/> 
          <aside>
              <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                </SheetContent>
              </Sheet>
            </aside>
      </div>
    </Layout> 
  )
}

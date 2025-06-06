import { IconeCheck, IconeCopiar, IconeX } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarioPeriodo } from "../CalendarioPeriodo";
import { toast } from "sonner";
import { SetStateAction, useState } from "react";
import { gerarSlugUrl } from "@/lib/urlUtils"

export default function InfoGeraisAcampa()
{
    const [nomeAcampa, setNomeAcampa] = useState('')
    function atualizaNomeAcampa(e: any){
       setNomeAcampa(e.target.value)
    }
    const handleCopyToClipboard = async () => {
    try {
      // Usa a API do navegador para escrever na área de transferência
      const caminho = gerarSlugUrl(nomeAcampa)
      await navigator.clipboard.writeText(`http://www.acampabento.com.br/${caminho}`);

      // Exibe um toast de sucesso (opcional, mas recomendado para feedback ao usuário)
       toast("Link copiado com sucesso!", {
            className: "bg-cyan-900 text-white shadow-lg p-10 flex",
            unstyled: true,
            invert: false,
            icon: IconeCopiar
        })
    } catch (err) {
      // Em caso de erro (por exemplo, permissão negada ou navegador antigo)
      console.error("Falha ao copiar o texto:", err);
       toast("Erro ao copiar link!", {
            className: "bg-rose-900 text-white shadow-lg p-10 flex",
            unstyled: true,
            invert: false,
            icon: IconeX
        })
    } return false}

    return(
        <>
        <div className="flex items-center flex-wrap">
            <div className="flex gap-x-6 gap-y-8 ">
                <div className="flex flex-col">
                    <Label htmlFor="acampamento" className="text-sm/6 font-medium text-gray-900">
                      Nome do Acampamento
                    </Label>
                    <div className="flex flex-col sm:flex-row items-center rounded-md bg-white p-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <div className="shrink-0 flex text-base text-gray-500 select-none sm:text-sm/6">
                                www.acampabento.com.br/
                            </div>
                            <Input id="nameAcampa"
                                    name="nameAcampa"
                                    type="text"
                                    value={nomeAcampa}
                                    onChange={atualizaNomeAcampa}
                                    placeholder="Bento-XVI"
                                    className="flex sm:w-32 w-full min-w-0 grow py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" ></Input>
                    </div>
                </div>
            </div>
            <div className="flex flex-col  sm:grid-cols-6 sm:ml-6  sm:mt-0">
                    <Label htmlFor="acampamento" className="flex text-sm/6 font-medium text-gray-900">
                        Link de inscrição dos Campistas
                    </Label>
                    <div className="flex">
                        <Input id="nameAcampa"
                            name="nameAcampa"
                            type="text"
                            placeholder="www.acampaento.com.br/Bento-XVI"
                            className="py-1.5 sm:flex-row bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                            </Input>
                        <div className="flex sm:flex-row text-base text-gray-500 select-none sm:text-sm/6">
                            <Button type="button" variant={"outline"} className="cursor-copy" size="sm" onClick={handleCopyToClipboard}>
                                {IconeCopiar} Copiar link 
                            </Button>
                        </div>      
                    </div>  
                </div>
            </div>
            <div className="flex flex-col sm:flex-row">
                <div className="flex items-center">
                    <div className="flex flex-col ">
                        <Label htmlFor="periodo" className="block text-sm/6 font-medium text-gray-900">
                            Período
                        </Label>
                        <CalendarioPeriodo />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col sm:m-10  gap-x-6 gap-y-8 ">
                    <div className="flex flex-col sm:flex-col">
                        <Label htmlFor="localAcampa" className="block text-sm/6 font-medium text-gray-900">
                            Local
                        </Label>
                        <div className="flex">
                            <Input id="localAcampa"
                                    name="localAcampa"
                                    type="text"
                                    placeholder="Centro de formação Paróquia São Pedro"
                                    className="flex  py-1.5  bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                            </Input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row">
                <div className="flex items-center">
                    <div className="flex flex-col mr-5">
                        <Label htmlFor="periodo" className="block text-sm/6 font-medium text-gray-900">
                            Taxa Equipe
                        </Label>
                        <Input id="taxaEquipe"
                                name="taxaEquipe"
                                type="number"
                                placeholder="R$"
                                className="flex  py-1.5  bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                            </Input>
                    </div>
                    <div className="flex flex-col mr-5">
                        <Label htmlFor="periodo" className="block text-sm/6 font-medium text-gray-900">
                            Taxa Equipe Externa
                        </Label>
                        <Input id="taxaEquipeExterna"
                                name="taxaEquipeExterna"
                                type="number"
                                placeholder="R$"
                                className="flex  py-1.5  bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                            </Input>
                    </div>
                    <div className="flex flex-col ">
                        <Label htmlFor="periodo" className="block text-sm/6 font-medium text-gray-900">
                            Taxa Campistas
                        </Label>
                        <Input id="taxaCampistas"
                                name="taxaCampistas"
                                type="number"
                                placeholder="R$"
                                className="flex  py-1.5  bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                            </Input>
                    </div>
                </div>
            </div>
            
        </>
    )
}
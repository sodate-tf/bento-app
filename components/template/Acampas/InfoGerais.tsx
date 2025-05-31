import { IconeCopiar } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarioPeriodo } from "../CalendarioPeriodo";
import { Button } from "@/components/ui/button";

export default function InfoGeraisAcampa(){
    return(
        <>
        <p className="text-muted-foreground mb-4 text-sm">Informações gerais do acampamento.</p>
        <div className="flex items-center">
            <div className="flex gap-x-6 gap-y-8 ">
                <div className="flex flex-col">
                    <Label htmlFor="acampamento" className="text-sm/6 font-medium text-gray-900">
                    Nome do Acampamento
                    </Label>
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                        www.acampabento.com.br/
                    </div>
                    <Input id="nameAcampa"
                            name="nameAcampa"
                            type="text"
                            placeholder="Bento-XVI"
                            className="block min-w-0 grow py-1.5 w-32 pr-3 p-1 ml-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" ></Input>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col sm:grid-cols-6 ml-6">
                    <Label htmlFor="acampamento" className="flex text-sm/6 font-medium text-gray-900">
                        Link de inscrição dos Campistas
                    </Label>
                    <div className="flex">
                        <Input id="nameAcampa"
                            name="nameAcampa"
                            type="text"
                            placeholder="www.acampaento.com.br/Bento-XVI"
                            className="py-1.5 bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                            </Input>
                        <div className="flex flex-col text-base text-gray-500 select-none sm:text-sm/6">
                            <Button variant={"outline"} size="sm">
                                {IconeCopiar} Copiar link 
                            </Button>
                        </div>      
                    </div>  
                </div>
            </div>
            <div className="flex gap-x-6 gap-y-8 ">
                <div className="flex items-center">
                <div className="flex flex-col mt-5">
                    <Label htmlFor="periodo" className="block text-sm/6 font-medium text-gray-900">
                        Período
                    </Label>
                    <CalendarioPeriodo></CalendarioPeriodo>
                </div>
            </div>
            <div className="flex flex-col gap-x-6 gap-y-8 ">
                <div className="flex flex-col mt-5">
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
        </>
    )
}
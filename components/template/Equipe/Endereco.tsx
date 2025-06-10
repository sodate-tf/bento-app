import Cep from "@/components/Cep";
import { IconeWarning } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pesquisarEndereco } from "@/lib/utils";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { toast } from "sonner";

export default function Endereco(){
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState({
        logradouro: "",
        bairro: "",
        localidade: "",
        uf: "",
        numero: 0,
        complemento: ""
    });

return(
    <>
    <div className="flex gap-x-6 gap-y-8 flex-wrap  mt-5">
        <div className="flex flex-col">
            <Label htmlFor="cep" className="text-sm/6 font-medium text-gray-900">
            CEP
            </Label>
            <Cep setCep={setCep} pesquisarEndereco={async () =>{
              const dataCep = await pesquisarEndereco(cep)
              if(dataCep)
                 setEndereco(dataCep)
                 
            }} cep={cep} />
        </div>
        </div>
        <div className="flex gap-x-6 gap-y-8 flex-wrap mt-5">
        <div className="flex flex-col">
                <Label htmlFor="Rua" className="text-sm/6 font-medium text-gray-900">
                Rua
                </Label>
                <Input id="rua"
                    name="rua"
                    placeholder="Nome da rua"
                    value={endereco.logradouro}
                    type="text"
                    className="flex bg-gray-50 sm:w-96 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
        </div>
        <div className="flex flex-col lg:ml-5">
            <Label htmlFor="numero" className="text-sm/6 font-medium text-gray-900">
            Número
            </Label>
            <Input id="numero"
                    name="numero"
                    placeholder="123"
                    value={endereco.numero}
                    type="text"
                    className="flex bg-gray-50 sm:w-30 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
        </div>
        <div className="flex flex-col lg:ml-5">
            <Label htmlFor="complemento" className="text-sm/6 font-medium text-gray-900">
            Complemento
            </Label>
            <Input id="complemento"
                    name="complemento"
                    placeholder="Fundos"
                    value={endereco.complemento}
                    type="text"
                    className="flex bg-gray-50 sm:w-30 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
        </div>              
        </div>
        <div className="flex gap-x-6 gap-y-8 flex-wrap mt-5">
            <div className="flex flex-col">
                <Label htmlFor="cidade" className="text-sm/6 font-medium text-gray-900">
                Cidade
                </Label>
                <Input id="cidade"
                    name="cidade"
                    placeholder="Presidente Prudente"
                    value={endereco.localidade}
                    type="text"
                    className="flex bg-gray-50 sm:w-96 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
        </div>
        <div className="flex flex-col lg:ml-5">
                <Label htmlFor="uf" className="text-sm/6 font-medium text-gray-900">
                UF
                </Label>
                <Input id="uf"
                    name="uf"
                    placeholder="SP"
                    value={endereco.uf}
                    type="text"
                    className="flex bg-gray-50 sm:w-12 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
        </div>
        </div>
    </>
    )
}
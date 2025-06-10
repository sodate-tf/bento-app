import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { IconeCalendario, IconePesquisando, IconeWarning } from "@/components/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";


import { SelectTrigger } from "@radix-ui/react-select";
import { format } from "date-fns";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ReactInputMask from "react-input-mask";
import FotoPerfil from "./FotoPerfil";
import CalendarioData from "@/components/CalendarioData";
import Celular from "@/components/Celular";
export default function InfosGerais(){
      const [cpf, setCpf] = useState('');
     
       const handleCpfChange = (event: any) => {
       setCpf(event.target.value);
  };
    return(
        <>
         <div className="flex">
                   <FotoPerfil />
                </div>
        <div className="flex gap-x-6 gap-y-8 flex-wrap  mt-5">
                <div className="flex flex-col">
                  <Label htmlFor="nomeAcampa" className="text-sm/6 font-medium text-gray-900">
                    Nome Completo
                  </Label>
                  <Input id="nameAcampa"
                         name="nameAcampa"
                         type="text"
                         className="flex bg-gray-50 sm:w-96 w-auto min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="cpf" className="text-sm/6 font-medium text-gray-900">
                      CPF 
                  </Label>
                  <ReactInputMask
                    mask="999.999.999-99" // Define a máscara
                    maskChar="_"          // Caractere que preenche a máscara (opcional, padrão é "_")
                    value={cpf}           // Liga o valor do input ao estado
                    onChange={handleCpfChange} // Atualiza o estado quando o valor muda
                    placeholder="___.___.___-__" // Placeholder para guiar o usuário
                    id="cpf"
                    className="flex bg-gray-50 w-40 p-1 text-base text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"/>            
                </div>
                <div className="flex flex-col lg:ml-5">
                  <Label htmlFor="celular" className="text-sm/6 font-medium text-gray-900">
                    Celular
                  </Label>
                  <Celular />
                </div>
              </div>
              <div className="flex gap-x-6 gap-y-8 flex-wrap mt-5">
                <div className="flex flex-col">
                    <Label htmlFor="nomeAcampa" className="text-sm/6 font-medium text-gray-900">
                    Data de Nascimento
                    </Label>
                    <div className="flex flex-col">
                    <CalendarioData />
                </div>
                </div>
                <div className="flex flex-col lg:ml-5">
                <Label htmlFor="instagram" className="text-sm/6 font-medium text-gray-900">
                    Instagram
                </Label>
                <Input id="instagram"
                        name="istagram"
                        placeholder="@ do instagram"
                        type="text"
                        className="flex bg-gray-50 sm:w-40 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
                </div>
                <div className="flex flex-col lg:ml-5">
                <Label htmlFor="estadoCivil" className="text-sm/6 font-medium text-gray-900">
                    Estado Civil
                </Label>
                <Select>
                    <SelectTrigger className="w-[180px] flex bg-gray-50 sm:w-40 min-w-0 py-1.5 sm:pl-0 pl-3 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6 ">
                    <SelectValue placeholder="  Solteiro" className="p-3" />
                    </SelectTrigger>
                    <SelectContent className="">
                    <SelectItem value="solteiro">Solteiro (a)</SelectItem>
                    <SelectItem value="casado">Casado (a)</SelectItem>
                    <SelectItem value="viuvo">Viúvo (a)</SelectItem>
                    <SelectItem value="uniaoEstavel">União Estável</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
            
        </>
    )
}
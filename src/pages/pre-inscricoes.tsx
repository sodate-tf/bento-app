import DataTablePreInscricoes from "@/components/template/CadastroCampista/DataTablePreInscricoes";
import Layout from "@/components/template/Layout";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function preInscricoes(){
    return (
    <Layout titulo="Gerenciar Pré Incrições" subTitulo="Pré inscrições do II Bento 30+">
        <div className="flex flex-col w-full bg-gray-200 p-3 ">
            <div className="flex flex-col">
                <div className="flex flex-col">
                <Label htmlFor="estadoCivil" className="text-sm/6 font-medium text-gray-900">
                    Acampamentos Ativos
                </Label>
                <Select>
                    <SelectTrigger className="w-[180px] flex bg-gray-50 sm:w-40 min-w-0 py-1.5 sm:pl-0 pl-3 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6 ">
                    <SelectValue placeholder="  Selecione" className="p-3" />
                    </SelectTrigger>
                    <SelectContent className="">
                        <SelectItem value="1">Bento 30+</SelectItem>
                        <SelectItem value="2">XV Acampabento</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
            <div className="flex flex-col">
               <DataTablePreInscricoes />
            </div>
        </div>
    </Layout> 
    )
}
import SelectAcampasAtivos from "@/components/SelectAcampasAtivos";
import DataTablePreInscricoes from "@/components/template/CadastroCampista/DataTablePreInscricoes";
import Layout from "@/components/template/Layout";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function preInscricoes(){
    return (
    <Layout titulo="Gerenciar Pré Incrições" subTitulo="Pré inscrições do II Bento 30+">
        <div className="flex flex-col w-full bg-gray-200 p-3 ">
            <div className="flex flex-col">
                <SelectAcampasAtivos />
            </div>
            <div className="flex flex-col">
               <DataTablePreInscricoes />
            </div>
        </div>
    </Layout> 
    )
}
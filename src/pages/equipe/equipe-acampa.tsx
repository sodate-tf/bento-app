import SelectAcampasAtivos from "@/components/SelectAcampasAtivos";
import DataTableEquipe from "@/components/template/Equipe/DataTableEquipe";
import Layout from "@/components/template/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export default function EquipeAcampa() { 
  
  const [bentoAtivo, setBentoAtivo] = useState()
  let ArraySelecionados: any[] = []
  function equipeSelecionada(tabela: any[]): void{
      ArraySelecionados = tabela
  }
  function gravarSelecinados(){
    // Array com todas as pessoas selecionadas para trabalhar no próximo acampa
    console.log(ArraySelecionados)
  }

  return (
    <Layout titulo="Formar Equipe de Trabalho do acampamento" subTitulo="Escolha os membros da equipe que participação do acampamento">
      <div className="flex flex-col w-full bg-gray-200 p-3 ">
        <SelectAcampasAtivos />
        <DataTableEquipe retornaLinhasSelecionadas={equipeSelecionada}/>
        <div className="flex">
            <Button className="bg-cyan-950 hover:bg-cyan-900 cursor-pointer" onClick={gravarSelecinados} >
              <UserPlus />
              Adicionar ao Acampa</Button>      
        </div>
          
      </div>
    </Layout> 
  )
}

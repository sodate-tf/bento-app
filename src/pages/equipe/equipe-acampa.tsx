import DataTableEquipe from "@/components/template/Equipe/DataTableEquipe";
import Layout from "@/components/template/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export default function EquipeAcampa() { 
  
  const [bentoAtivo, setBentoAtivo] = useState()
  const BENTOS_ATIVOS = ['II Bento 30+']

  function equipeSelecionada(tabela: any[]): void{
      console.log(tabela)
  }

  return (
    <Layout titulo="Formar Equipe de Trabalho do acampamento" subTitulo="Escolha os membros da equipe que participação do acampamento">
      <div className="flex flex-col w-full bg-gray-200 p-3 ">
        <div className="flex flex-col">
            <Label>Selecione o Acampamento:</Label>
            <Select
                value={bentoAtivo}
                onValueChange={(value: any) => setBentoAtivo(value)}>
                <SelectTrigger className="bg-white p-3 mt-3">
                  <SelectValue  placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                {BENTOS_ATIVOS.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
                </SelectContent>
            </Select>
        </div>
        <DataTableEquipe retornaLinhasSelecionadas={equipeSelecionada}/>
        <div className="flex">
            <Button className="bg-cyan-950 hover:bg-cyan-900 cursor-pointer" >
              <UserPlus />
              Adicionar ao Acampa</Button>      
        </div>
          
      </div>
    </Layout> 
  )
}

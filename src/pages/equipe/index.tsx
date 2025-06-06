import DataTableEquipe from "@/components/template/Equipe/DataTableEquipe";
import FormCadastroEquipe from "@/components/template/Equipe/FormCadastroEquipe";
import Layout from "@/components/template/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Equipe() { 
  const [formVisivel, setFormVisivel] = useState<boolean>(false)
  function novoAcampa(){
      setFormVisivel(true)
  }
  function clickCancelar(){
    setFormVisivel(false)
  }
  return (
    <Layout titulo="Gerenciar Equipe de Trabalho" subTitulo="Gerencie aqui a equipe de trabalho">
      <div className="flex flex-col w-full bg-gray-200 p-3 ">
        <div className="flex flex-col">
          {(!formVisivel) ?
          <Button className="mt-4 w-45 bg-cyan-800 hover:bg-cyan-600 cursor-pointer"
                onClick={novoAcampa} >Novo Membro
          </Button>
         : false }
          
        </div>
        {(formVisivel) ? 
            <FormCadastroEquipe clickCancelar={clickCancelar}/>
        :
            <DataTableEquipe/>
        }        
      </div>
    </Layout> 
  )
}

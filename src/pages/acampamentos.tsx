import DataTableAcampas from "@/components/template/Acampas/DataTableAcampas";
import FormCadastroAcampa from "@/components/template/Acampas/FormCadastroAcampamento";
import Layout from "@/components/template/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Acampamentos() { 
  const [formVisivel, setFormVisivel] = useState<boolean>(false)
  function novoAcampa(){
      setFormVisivel(true)
  }
  function clickCancelar(){
    setFormVisivel(false)
  }
  return (
    <Layout titulo="Gerenciar Acampamentos" subTitulo="Cadastre aqui os acampamentos">
      <div className="flex flex-col w-full bg-gray-200 p-3 ">
        <div className="flex flex-col">
          {(!formVisivel) ?
          <Button className="mt-4 w-45 bg-cyan-800 hover:bg-cyan-600 cursor-pointer"
                onClick={novoAcampa} >Novo Acampamento
          </Button>
         : false }
          
        </div>
        {(formVisivel) ? 
            <FormCadastroAcampa clickCancelar={clickCancelar}/>
        :
            <DataTableAcampas/>
        }        
      </div>
    </Layout> 
  )
}

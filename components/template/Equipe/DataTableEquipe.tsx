import EquipeClass from "@/components/context/equipe";
import { Equipe, columns } from "@/components/dataTable/Equipe/columns"
import { DataTable } from "@/components/dataTable/Equipe/data-table"
import { equipeFake } from "@/src/data/tabelasFake";
import pessoaService, { PessoaApiData } from "@/src/service/pessoaService";

const membrosEquipeTrabalho = await pessoaService.getAll();

function getEquipeInstances(): PessoaApiData[]{
    return membrosEquipeTrabalho.map(equipeData  =>{
        return EquipeClass.fromApiData({
            uid: equipeData.uid,
            nome_completo: equipeData.nome_completo,
            telefone: equipeData.telefone,
            data_nascimento: equipeData.data_nascimento,
            cpf: equipeData.cpf,
            cep: equipeData.cep,
            numero: equipeData.numero 
        })    
    })
}
 function getData(): Equipe[] {
  // Fetch data from your API here.
  return getEquipeInstances()
}
interface DataTableEquipeProps{
    retornaLinhasSelecionadas?: (tabela: any[]) => any[]
}


export default function DataTableEquipe(props : DataTableEquipeProps){
    const data = getData()

    function retornaLinhasSelecionadas(tabela: any[]){
            return tabela
    }
    return(
        <div className="flex flex-col mx-auto py-10 w-full ">
            <DataTable columns={columns} data={data} retornaLinhasSelecionadas={props.retornaLinhasSelecionadas} />
        </div>
    )
}
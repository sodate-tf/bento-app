import EquipeClass from "@/components/context/equipe";
import { Equipe, columns } from "@/components/dataTable/Equipe/columns"
import { DataTable } from "@/components/dataTable/Equipe/data-table"
import { equipeFake } from "@/src/data/tabelasFake";


const dadosBrutosParaTeste = equipeFake;

function getEquipeInstances(): Equipe[]{
    return dadosBrutosParaTeste.map(equipeData  =>{
        return EquipeClass.criarDeDados({
            uid: equipeData.uid,
            nome: equipeData.nome,
            celular: equipeData.celular,
            dataNascimento: equipeData.dataNascimento,
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
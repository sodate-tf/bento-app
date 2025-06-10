import CampistaClass from "@/components/context/campista";
import { PreInscricao, columns } from "@/components/dataTable/PreInscricao/columns"
import { DataTable } from "@/components/dataTable/PreInscricao/data-table";
import { preInscricaoFake } from "@/src/data/tabelasFake";
//import PreInscricao from "@/src/model/PreInscricao";

const dadosBrutosParaTeste = preInscricaoFake;

function getPreInscricaoInstances(): PreInscricao[]{
    return dadosBrutosParaTeste.map(campistaData  =>{
        return CampistaClass.criarDeDados({
            uidCampista: campistaData.uid,
            nome: campistaData.nome,
            dataNascimento: campistaData.dataNascimento,
            celular: campistaData.celular,
            status: campistaData.status
        })    
    })
}
 function getData(): PreInscricao[] {
  // Fetch data from your API here.
  return getPreInscricaoInstances()
}

export default function DataTablePreInscricoes(){
    const data = getData()
    return(
        <div className="flex flex-col mx-auto py-10 w-full ">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
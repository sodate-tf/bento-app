import AcampamentosClass  from "@/components/context/acampamentos"
import { Acampamento, columns } from "@/components/dataTable/Acampamentos/columns"
import { DataTable } from "@/components/dataTable/Acampamentos/data-table"
import { acampaFake } from "@/src/data/tabelasFake";


const dadosBrutosParaTeste = acampaFake;

function getAcampamentosInstances(): Acampamento[]{
    return dadosBrutosParaTeste.map(acampaData  =>{
        return AcampamentosClass.criarDeDados({
            uid: acampaData.uid,
            nome: acampaData.nome,
            dataInicio: acampaData.dataInicio,
            dataFinal: acampaData.dataFinal,  
        })    
    })
}
 function getData(): Acampamento[] {
  // Fetch data from your API here.
  return getAcampamentosInstances()
}

export default function DataTableAcampas(){
    const data = getData()
    return(
        <div className="flex flex-col mx-auto py-10 w-full ">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
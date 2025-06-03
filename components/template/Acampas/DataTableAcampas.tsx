import AcampamentosClass  from "@/components/context/acampamentos"
import { Acampamento, columns } from "@/components/dataTable/Acampamentos/columns"
import { DataTable } from "@/components/dataTable/Acampamentos/data-table"


const dadosBrutosParaTeste = [
    // Note que dataInicio e dataFinal podem ser strings ou Date, como definido no construtor da classe
    { nome: 'I Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '1'},
    { nome: 'II Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '2'},
    { nome: 'III Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '3'},
    { nome: 'IV Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '4'},
    { nome: 'V Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '5'},
    { nome: 'VI Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '6'},
    { nome: 'VII Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '7'},
    { nome: 'VIII Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '8'},
    { nome: 'IX Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '9'},
    { nome: 'X Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '10'},
    { nome: 'XI Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '11'},
    { nome: 'XII Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '12'},
    { nome: 'XIII Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '13'},
    { nome: 'XIV Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '14'},
    { nome: 'II Bento 30+', dataInicio: new Date("2025-11-15"), dataFinal: new Date("2025-11-19"), uid: '15' },
    { nome: 'XV Acampabento', dataInicio: new Date("2026-03-15"), dataFinal: new Date("2026-03-19"), uid: '16'},
    { nome: 'III Bento 30+', dataInicio: new Date("2026-11-15"), dataFinal: new Date("2026-11-19"), uid: '17' },
];

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
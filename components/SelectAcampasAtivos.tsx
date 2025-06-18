import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import axios from "axios";

interface Acampamento {
  id: number;
  nome_acampa: string;
}
const API_BASE_URL = "http://localhost:3001/api/bentoapp/acampamentos"
export default function SelectAcampasAtivos(){
    const [acampamentos, setAcampamentos] = useState<Acampamento[]>([]);
    const [selectedId, setSelectedId] = useState<string>("");
    useEffect(() => {
    async function fetchAcampamentos() {
      try {
        const response = await axios.get(`${API_BASE_URL}/acoes/getacampasativos/`);
        setAcampamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar acampamentos ativos:', error);
      }
    }

    fetchAcampamentos();
  }, []);
  

    return(
    <div className="flex flex-col">
        <Label htmlFor="estadoCivil" className="text-sm/6 font-medium text-gray-900">
            Acampamentos Ativos
        </Label>
        <Select>
            <SelectTrigger className="w-[180px] flex bg-gray-50 sm:w-40 min-w-0 py-1.5 sm:pl-0 pl-3 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6 ">
            <SelectValue placeholder="  Selecione" className="p-3" />
            </SelectTrigger>
            <SelectContent>
              {(acampamentos.length === 0) ? (
                    <SelectItem key={0} value=" ">
                        NÃO TEM ACAMPAMENTO ATIVOS
                    </SelectItem>
              ) :( 
                acampamentos.map((acampa) => (
                <SelectItem key={acampa.id} value={String(acampa.id)}>
                {acampa.nome_acampa}
                </SelectItem>
             )) 
              
             )}
             </SelectContent>
        </Select>
    </div>
    )
}
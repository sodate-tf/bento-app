import DateInputWithIcon from "@/components/DateWhitIcon";
import InputWithIcon from "@/components/InputWithIcon";
import SelectWithIcon from "@/components/SelectWhitIcons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDateForInput } from "@/lib/utils";
import { PessoaApiData } from "@/src/service/pessoaService";
import { UserProfile } from "@/src/types/userProfile";
import { Cake, Gauge, Hammer, HeartHandshake, Ruler, Shirt } from "lucide-react";

interface InformacoesPessoaisProps {
  profile: PessoaApiData;
  onProfileChange: (field: keyof PessoaApiData, value: any) => void;
}


const T_SHIRT_SIZES = [
    { value: 'PP', label: 'PP' },
    { value: 'P', label: 'P' },
    { value: 'M', label: 'M' },
    { value: 'G', label: 'G' },
    { value: 'GG', label: 'GG' },
    { value: 'XGG', label: 'XGG' },
    { value: 'EG', label: 'EG' },
    { value: 'XXGG', label: 'XXGG' },
];

const CIVIL_STATUS_OPTIONS = [
  { label: 'Solteiro(a)', value: 'solteiro' },
  { label: 'Casado(a)', value: 'casado' },
  { label: 'Divorciado(a)', value: 'divorciado' },
  { label: 'União Estável', value: 'uniao_estavel' },
  { label: 'Viúvo(a)', value: 'viuvo' }
]

export default function InformacoesPessoais(props: InformacoesPessoaisProps){
    const profile = props.profile
    const onProfileChange = props.onProfileChange
    return(
       <div className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Informações Pessoais
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <InputWithIcon
            id="peso"
            labelText="Peso (kg)"
            icon={Gauge  }
            value={profile.peso}
            onChange={(e) => props.onProfileChange('peso', e.target.value)}
            error=""
            placeholder="00,0"
            type="number"
        />

        <InputWithIcon
            id="altura"
            labelText="Altura (cm)"
            icon={Ruler  }
            value={profile.altura}
            onChange={(e) => props.onProfileChange('altura', e.target.value)}
            error=""
            placeholder="171"
            type="number"
        />
    
        <SelectWithIcon
                id="camiseta"
                labelText="Camiseta"
                options={T_SHIRT_SIZES}
                value={profile.camiseta}
                // === PONTO CHAVE DE CORREÇÃO ===
                // Mude 'onChange' para 'onValueChange'.
                // O 'value' que o SelectWithIcon passará será a string diretamente,
                // não um evento completo.
                onValueChange={(newValue) => onProfileChange('camiseta', newValue)}
                error={""} // Se houver lógica de erro, passe a mensagem aqui
                className="col-span-1"
                icon={Shirt} // Ícone de exemplo
            />

      <InputWithIcon
            id="profissao"
            labelText="Profissão"
            icon={Hammer  }
            value={profile.profissao}
            onChange={(e) => props.onProfileChange('profissao', e.target.value)}
            error=""
            placeholder=""
        />
        <DateInputWithIcon
            id="data_nascimento"
            labelText="Data de Nascimento"
            value={formatDateForInput(profile.data_nascimento.toString())}
            onChange={(e) => props.onProfileChange('data_nascimento', e)}
            className="col-span-1" // Ajuste o layout conforme necessário
            min={"17"}
            max={"99"}
            // Você pode passar um ícone diferente se quiser:
            icon={Cake}
        />
        
         <SelectWithIcon
                id="estado_civil"
                labelText="Estado Civil"
                options={CIVIL_STATUS_OPTIONS}
                value={profile.estado_civil}
                // === PONTO CHAVE DE CORREÇÃO ===
                // Mude 'onChange' para 'onValueChange'.
                // O 'value' que o SelectWithIcon passará será a string diretamente,
                // não um evento completo.
                onValueChange={(newValue) => onProfileChange('estado_civil', newValue)}
                error={""} // Se houver lógica de erro, passe a mensagem aqui
                className="col-span-1"
                icon={HeartHandshake} // Ícone de exemplo
            />
      </div>
    </div> 
    )
}
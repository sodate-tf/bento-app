import Cep from "@/components/Cep";
import CEPWithIcon from "@/components/CEPWhithIcons";
import InputWithIcon from "@/components/InputWithIcon";
import SelectWithIcon from "@/components/SelectWhitIcons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { pesquisarEndereco } from "@/lib/utils";
import { PessoaApiData } from "@/src/service/pessoaService";
import { UserProfile } from "@/src/types/userProfile";
import { Building, Building2, House, Landmark, MapPinHouse, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface EnderecoProps {
  profile: PessoaApiData;
  onProfileChange: (field: keyof PessoaApiData, value: any) => void;
}

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', '' +
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO'
];
const formattedBrazilianStates = BRAZILIAN_STATES.map(state => ({
    label: state,
    value: state
}));


export default function Endereco(props: EnderecoProps){
    function atualizaEndereco(data: any){
         // Chame onProfileChange para CADA campo que você quer atualizar
        // Isso força o componente pai a atualizar seu estado e re-renderizar,
        // passando um novo objeto 'profile' para Endereco.
        props.onProfileChange('rua', data.rua || ''); // ViaCEP usa 'logradouro' para rua
        props.onProfileChange('bairro', data.bairro || '');
        props.onProfileChange('cidade', data.cidade || ''); // ViaCEP usa 'localidade' para cidade
        props.onProfileChange('estado', data.estado || ''); // ViaCEP usa 'uf' para estado
    
    }
    return(
        <div className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Endereço
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

        <CEPWithIcon
            id="cep"
            labelText="CEP"
            value={props.profile.cep}
            onChange={(maskedValue) => props.onProfileChange('cep', maskedValue)}
            onBlur={async (rawValue, isValid) => { // rawValue = CEP sem máscara
                        if (isValid && rawValue) {
                            console.log('CEP validado no blur:', rawValue);
                            const dataCep = await pesquisarEndereco(rawValue); // Pesquisa com o CEP sem máscara
                            if (dataCep) {
                                atualizaEndereco(dataCep);
                            }
                        }
                    }}
            required
            error={""}
        />
        <InputWithIcon
            id="rua"
            labelText="Rua"
            icon={MapPinHouse  }
            value={props.profile.rua}
            onChange={(e) => props.onProfileChange('rua', e.target.value)}
            error=""
            placeholder=""
        />
        <InputWithIcon
            id="numero"
            labelText="Número"
            icon={House  }
            value={props.profile.numero}
            onChange={(e) => props.onProfileChange('numero', e.target.value)}
            error=""
            placeholder=""
        />
       <InputWithIcon
            id="complemento"
            labelText="Complemento"
            icon={Plus  }
            value={props.profile.complemento}
            onChange={(e) => props.onProfileChange('complemento', e.target.value)}
            error=""
            placeholder=""
        />
        <InputWithIcon
            id="bairro"
            labelText="Bairro"
            icon={Plus  }
            value={props.profile.bairro}
            onChange={(e) => props.onProfileChange('bairro', e.target.value)}
            error=""
            placeholder=""
        />
        <InputWithIcon
            id="cidade"
            labelText="Cidade"
            icon={Building2  }
            value={props.profile.cidade}
            onChange={(e) => props.onProfileChange('cidade', e.target.value)}
            error=""
            placeholder=""
        />
        <SelectWithIcon
          id="estado"
          labelText="Estado"
          options={formattedBrazilianStates}
          value={props.profile.estado}
          onValueChange={(e) => props.onProfileChange('estado', e)}
          error={""} // Combina erro externo com interno
          className="col-span-1" // Ajuste o layout conforme necessário
          // Você pode passar um ícone diferente se quiser:
           icon={Landmark}
      />
      
  
      </div>
    </div>
    )
}
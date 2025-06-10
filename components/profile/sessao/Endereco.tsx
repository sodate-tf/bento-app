import Cep from "@/components/Cep";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { pesquisarEndereco } from "@/lib/utils";
import { UserProfile } from "@/src/types/userProfile";
import { useState } from "react";

interface EnderecoProps {
  profile: UserProfile;
  onProfileChange: (field: keyof UserProfile, value: any) => void;
}

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', '' +
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO'
];

export default function Endereco(props: EnderecoProps){
    const profile = props.profile
    const onProfileChange = props.onProfileChange
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState({
        logradouro: "",
        bairro: "",
        localidade: "",
        uf: "",
        numero: 0,
        complemento: ""
    });
    function atualizaEndereco(data: any){
        profile.rua = data.logradouro
        profile.bairro = data.bairro
        profile.cidade = data.localidade
        profile.estado = data.uf
        setEndereco(data)
    }
    return(
        <div className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Endereço
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <Label htmlFor="cep">CEP</Label>
          <Cep setCep={setCep} pesquisarEndereco={async () =>{
                        const dataCep = await pesquisarEndereco(cep)
                        if(dataCep)
                           atualizaEndereco(dataCep)
                           
                      }} cep={cep} />
        </div>
        <div className="md:col-span-2"> {/* Rua ocupa 2 colunas em telas maiores */}
          <Label htmlFor="rua">Rua</Label>
          <Input
            id="rua"
            value={profile.rua}
            onChange={(e) => onProfileChange('rua', e.target.value)}
            placeholder="Nome da Rua, Avenida, etc."
          />
        </div>
        <div>
          <Label htmlFor="numero">Número</Label>
          <Input
            id="numero"
            value={profile.numero}
            onChange={(e) => onProfileChange('numero', e.target.value)}
            placeholder="Ex: 123"
          />
        </div>
        <div>
          <Label htmlFor="complemento">Complemento (Opcional)</Label>
          <Input
            id="complemento"
            value={profile.complemento}
            onChange={(e) => onProfileChange('complemento', e.target.value)}
            placeholder="Apto, Bloco, Casa"
          />
        </div>
        <div>
          <Label htmlFor="bairro">Bairro</Label>
          <Input
            id="bairro"
            value={profile.bairro}
            onChange={(e) => onProfileChange('bairro', e.target.value)}
            placeholder="Seu bairro"
          />
        </div>
        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            value={profile.cidade}
            onChange={(e) => onProfileChange('cidade', e.target.value)}
            placeholder="Sua cidade"
          />
        </div>
        <div>
          <Label htmlFor="estado">Estado</Label>
          <Select
            value={profile.estado}
            onValueChange={(value: any) => onProfileChange('estado', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {BRAZILIAN_STATES.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
    )
}
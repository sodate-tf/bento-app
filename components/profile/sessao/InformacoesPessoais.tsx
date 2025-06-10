import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserProfile } from "@/src/types/userProfile";

interface InformacoesPessoaisProps {
  profile: UserProfile;
  onProfileChange: (field: keyof UserProfile, value: any) => void;
}

const T_SHIRT_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XGG', 'EG', 'XXGG'];
const CIVIL_STATUS_OPTIONS = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'Separado(a)'];

export default function InformacoesPessoais(props: InformacoesPessoaisProps){
    const profile = props.profile
    const onProfileChange = props.onProfileChange
    return(
       <div className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Informações Pessoais
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div>
          <Label htmlFor="peso">Peso (kg)</Label>
          <Input
            id="peso"
            value={profile.peso ?? ''} // Use ?? '' para converter null para string vazia para o input
            onChange={(e) => onProfileChange('peso', Number(e.target.value) || null)}
            placeholder="Ex: 70.5"
            type="number"
            step="0.1"
          />
        </div>
        <div>
          <Label htmlFor="altura">Altura (cm)</Label>
          <Input
            id="altura"
            value={profile.altura ?? ''}
            onChange={(e) => onProfileChange('altura', Number(e.target.value) || null)}
            placeholder="Ex: 175"
            type="number"
          />
        </div>
        <div>
          <Label htmlFor="tamanhoCamiseta">Tamanho da Camiseta</Label>
          <Select
            value={profile.tamanhoCamiseta}
            onValueChange={(value: any) => onProfileChange('tamanhoCamiseta', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {T_SHIRT_SIZES.map(size => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="profissao">Profissão</Label>
          <Input
            id="profissao"
            value={profile.profissao}
            onChange={(e) => onProfileChange('profissao', e.target.value)}
            placeholder="Sua profissão"
          />
        </div>
        <div>
          <Label htmlFor="dtNascimento">Data de Nascimento</Label>
          <Input
            id="dtNascimento"
            value={profile.dtNascimento ?? ''}
            onChange={(e) => onProfileChange('dtNascimento', e.target.value)}
            type="date" // Input type date para seletor de data
          />
        </div>
        <div>
          <Label htmlFor="estadoCivil">Estado Civil</Label>
          <Select
            value={profile.estadoCivil}
            onValueChange={(value: any) => onProfileChange('estadoCivil', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {CIVIL_STATUS_OPTIONS.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div> 
    )
}
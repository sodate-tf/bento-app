import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/src/types/userProfile";

interface InformacoesContatoEmergenciaProps {
  profile: UserProfile;
  onProfileChange: (field: keyof UserProfile, value: any) => void;
}

export default function InformacoesContatoEmergencia(props: InformacoesContatoEmergenciaProps){
    const profile = props.profile
    const onProfileChange = props.onProfileChange
    return(
        <div className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Contato de Emergência
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <Label htmlFor="contatoEmergenciaNome">Nome do Contato de Emergência</Label>
          <Input
            id="contatoEmergenciaNome"
            value={profile.contatoEmergenciaNome}
            onChange={(e) => onProfileChange('contatoEmergenciaNome', e.target.value)}
            placeholder="Nome completo do contato"
          />
        </div>
        <div>
          <Label htmlFor="contatoEmergenciaTelefone">Telefone do Contato de Emergência</Label>
          <Input
            id="contatoEmergenciaTelefone"
            value={profile.contatoEmergenciaTelefone}
            onChange={(e) => onProfileChange('contatoEmergenciaTelefone', e.target.value)}
            placeholder="(XX) XXXXX-XXXX"
            type="tel"
          />
        </div>
      </div>
    </div>
    )
}
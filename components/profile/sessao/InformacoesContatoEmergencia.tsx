import InputWithIcon from "@/components/InputWithIcon";
import TelefoneWithIcon from "@/components/TelefoneWhithIcons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PessoaApiData } from "@/src/service/pessoaService";
import { UserProfile } from "@/src/types/userProfile";
import { ShieldAlert } from "lucide-react";

interface InformacoesContatoEmergenciaProps {
  profile: PessoaApiData;
  onProfileChange: (field: keyof PessoaApiData, value: any) => void;
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
        <InputWithIcon
            id="contato_emergencia"
            labelText="Nome do Contato de Emergência"
            icon={ShieldAlert  }
            value={profile.contato_emergencia}
            onChange={(e) => props.onProfileChange('contato_emergencia', e.target.value)}
            error=""
            placeholder="Seu contato de emergência"
        />

           <TelefoneWithIcon
            id="telefone_emergencia"
            labelText="Telefone do Contato de Emergência"
            value={profile.telefone_emergencia}
            onChange={(e) => props.onProfileChange('telefone_emergencia', e)}
            error={""} // Combina erro externo com interno
            className="col-span-1" // Ou ajuste o layout como precisar
        />
      </div>
    </div>
    )
}
import Celular from "@/components/Celular";
import CPFWithIcon from "@/components/CPFWhithIcons";
import EmailWithIcon from "@/components/EmailWhitIcons";
import InputWithIcon from "@/components/InputWithIcon";
import TelefoneWithIcon from "@/components/TelefoneWhithIcons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PessoaApiData } from "@/src/service/pessoaService";
import { UserProfile } from "@/src/types/userProfile";
import { AtSign, PersonStanding, Tag } from "lucide-react";

interface InformacoesBasicasProps {
  profile: PessoaApiData;
  onProfileChange: (field: keyof PessoaApiData, value: any) => void;
}

export default function InformacoesBasicas(props: InformacoesBasicasProps){
    const profile = props.profile
    return(
        <div className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Informações Básicas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <InputWithIcon
            id="nome_completo"
            labelText="Nome completo"
            icon={PersonStanding }
            value={profile.nome_completo}
            onChange={(e) => props.onProfileChange('nome_completo', e.target.value)}
            required
            error=""
            placeholder="Seu nome completo"
        />
        <CPFWithIcon
            id="cpf"
            labelText="CPF"
            value={profile.cpf}
            onChange={(e) => props.onProfileChange('cpf', e)}
            required
            error={""} // Combina erro externo com interno
            className="col-span-1" // Ou ajuste o layout como precisar
        />

        <TelefoneWithIcon
            id="telefone"
            labelText="Celular"
            value={profile.telefone}
            onChange={(e) => props.onProfileChange('telefone', e)}
            required
            error={""} // Combina erro externo com interno
            className="col-span-1" // Ou ajuste o layout como precisar
        />

        <EmailWithIcon
            id="email"
            labelText="E-mail"
            value={profile.email}
            onChange={(e) => props.onProfileChange('email', e)}
            error={""} // Combina erro externo com interno
            className="col-span-1" // Ou ajuste o layout como precisar
        />
        
        <InputWithIcon
            id="Instagram"
            labelText="@ do instagram"
            icon={AtSign  }
            value={profile.instagram}
            onChange={(e) => props.onProfileChange('instagram', e.target.value)}
            error=""
            placeholder="seuperfil"
        />
      </div>
    </div>
    )
}
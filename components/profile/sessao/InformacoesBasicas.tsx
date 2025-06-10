import Celular from "@/components/Celular";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/src/types/userProfile";

interface InformacoesBasicasProps {
  profile: UserProfile;
  onProfileChange: (field: keyof UserProfile, value: any) => void;
}

export default function InformacoesBasicas(props: InformacoesBasicasProps){
    const profile = props.profile
    return(
        <div className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Informações Básicas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <Label htmlFor="nome">Nome Completo</Label>
          <Input
            id="nome"
            value={profile.nome}
            onChange={(e) => props.onProfileChange('nome', e.target.value)}
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Celular value={profile.telefone}
            onChange={(e) => props.onProfileChange('telefone', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            value={profile.email}
            onChange={(e) => props.onProfileChange('email', e.target.value)}
            placeholder="seu.email@exemplo.com"
            type="email"
          />
        </div>
        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            value={profile.instagram}
            onChange={(e) => props.onProfileChange('instagram', e.target.value)}
            placeholder="@seuinstagram"
          />
        </div>
      </div>
    </div>
    )
}
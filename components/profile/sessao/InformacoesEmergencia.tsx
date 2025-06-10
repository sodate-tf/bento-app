import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserProfile } from "@/src/types/userProfile";

interface InformacoesEmergenciaProps {
  profile: UserProfile;
  onProfileChange: (field: keyof UserProfile, value: any) => void;
}

export default function InformacoesEmergencia(props: InformacoesEmergenciaProps){
    const profile = props.profile
    const onProfileChange = props.onProfileChange
    return(
        <div className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Informações de Emergência
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Alergia */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="possuiAlergia"
              checked={profile.possuiAlergia}
              onCheckedChange={(checked) => onProfileChange('possuiAlergia', checked)}
            />
            <Label htmlFor="possuiAlergia">Possui alguma alergia?</Label>
          </div>
          {profile.possuiAlergia && (
            <div className="mt-2">
              <Label htmlFor="alergiasDetalhes">Quais alergias?</Label>
              <Textarea
                id="alergiasDetalhes"
                value={profile.alergiasDetalhes || ''}
                onChange={(e) => onProfileChange('alergiasDetalhes', e.target.value)}
                placeholder="Ex: Alergia a amendoim, picada de abelha, etc."
              />
            </div>
          )}
        </div>

        {/* Doença */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="possuiDoenca"
              checked={profile.possuiDoenca}
              onCheckedChange={(checked) => onProfileChange('possuiDoenca', checked)}
            />
            <Label htmlFor="possuiDoenca">Possui alguma doença crônica?</Label>
          </div>
          {profile.possuiDoenca && (
            <div className="mt-2">
              <Label htmlFor="doencasDetalhes">Quais doenças?</Label>
              <Textarea
                id="doencasDetalhes"
                value={profile.doencasDetalhes || ''}
                onChange={(e) => onProfileChange('doencasDetalhes', e.target.value)}
                placeholder="Ex: Diabetes, asma, epilepsia, etc."
              />
            </div>
          )}
        </div>

        {/* Tratamento */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fazTratamento"
              checked={profile.fazTratamento}
              onCheckedChange={(checked) => onProfileChange('fazTratamento', checked)}
            />
            <Label htmlFor="fazTratamento">Faz algum tratamento médico?</Label>
          </div>
          {profile.fazTratamento && (
            <div className="mt-2">
              <Label htmlFor="tratamentosDetalhes">Quais tratamentos?</Label>
              <Textarea
                id="tratamentosDetalhes"
                value={profile.tratamentosDetalhes || ''}
                onChange={(e) => onProfileChange('tratamentosDetalhes', e.target.value)}
                placeholder="Ex: Fisioterapia, terapia, etc."
              />
            </div>
          )}
        </div>

        {/* Medicamento Controlado */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="usoMedicamentoControlado"
              checked={profile.usoMedicamentoControlado}
              onCheckedChange={(checked) => onProfileChange('usoMedicamentoControlado', checked)}
            />
            <Label htmlFor="usoMedicamentoControlado">Faz uso de medicamento controlado?</Label>
          </div>
          {profile.usoMedicamentoControlado && (
            <div className="mt-2">
              <Label htmlFor="medicamentosDetalhes">Quais medicamentos e posologia?</Label>
              <Textarea
                id="medicamentosDetalhes"
                value={profile.medicamentosDetalhes || ''}
                onChange={(e) => onProfileChange('medicamentosDetalhes', e.target.value)}
                placeholder="Ex: Insulina (horários), Ritalina (doses), etc."
              />
            </div>
          )}
        </div>

        {/* Plano de Saúde */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="possuiPlanoSaude"
              checked={profile.possuiPlanoSaude}
              onCheckedChange={(checked) => onProfileChange('possuiPlanoSaude', checked)}
            />
            <Label htmlFor="possuiPlanoSaude">Possui plano de saúde?</Label>
          </div>
          {profile.possuiPlanoSaude && (
            <div className="mt-2">
              <Label htmlFor="planoSaudeNome">Nome do Plano de Saúde</Label>
              <Input
                id="planoSaudeNome"
                value={profile.planoSaudeNome || ''}
                onChange={(e) => onProfileChange('planoSaudeNome', e.target.value)}
                placeholder="Ex: Unimed, Bradesco Saúde"
              />
            </div>
          )}
        </div>
      </div>
    </div>
    )
}
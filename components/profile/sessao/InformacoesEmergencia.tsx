import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PessoaApiData } from "@/src/service/pessoaService";
import { UserProfile } from "@/src/types/userProfile";

interface InformacoesEmergenciaProps {
  profile: PessoaApiData;
  onProfileChange: (field: keyof PessoaApiData, value: any) => void;
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
              id="alergia"
              checked={profile.alergia}
              onCheckedChange={(checked) => onProfileChange('alergia', checked)}
            />
            <Label htmlFor="alergia">Possui alguma alergia?</Label>
          </div>
          {profile.alergia && (
            <div className="mt-2">
              <Label htmlFor="qual_alergia">Quais alergias?</Label>
              <Textarea
                id="qual_alergia"
                value={profile.qual_alergia || ''}
                onChange={(e) => onProfileChange('qual_alergia', e.target.value)}
                placeholder="Ex: Alergia a amendoim, picada de abelha, etc."
              />
            </div>
          )}
        </div>

        {/* Doença */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="doenca_cronica"
              checked={profile.doenca_cronica}
              onCheckedChange={(checked) => onProfileChange('doenca_cronica', checked)}
            />
            <Label htmlFor="doenca_cronica">Possui alguma doença crônica?</Label>
          </div>
          {profile.doenca_cronica && (
            <div className="mt-2">
              <Label htmlFor="qual_doenca">Quais doenças?</Label>
              <Textarea
                id="qual_doenca"
                value={profile.qual_doenca || ''}
                onChange={(e) => onProfileChange('qual_doenca', e.target.value)}
                placeholder="Ex: Diabetes, asma, epilepsia, etc."
              />
            </div>
          )}
        </div>

        {/* Tratamento */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="tratamento_medico"
              checked={profile.tratamento_medico}
              onCheckedChange={(checked) => onProfileChange('tratamento_medico', checked)}
            />
            <Label htmlFor="tratamento_medico">Faz algum tratamento médico?</Label>
          </div>
          {profile.tratamento_medico && (
            <div className="mt-2">
              <Label htmlFor="qual_tratamento">Quais tratamentos?</Label>
              <Textarea
                id="qual_tratamento"
                value={profile.qual_tratamento || ''}
                onChange={(e) => onProfileChange('qual_tratamento', e.target.value)}
                placeholder="Ex: Fisioterapia, terapia, etc."
              />
            </div>
          )}
        </div>

        {/* Medicamento Controlado */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="medicamento_controlado"
              checked={profile.medicamento_controlado}
              onCheckedChange={(checked) => onProfileChange('medicamento_controlado', checked)}
            />
            <Label htmlFor="medicamento_controlado">Faz uso de medicamento controlado?</Label>
          </div>
          {profile.medicamento_controlado && (
            <div className="mt-2">
              <Label htmlFor="qual_medicamento">Quais medicamentos e posologia?</Label>
              <Textarea
                id="qual_medicamento"
                value={profile.qual_medicamento || ''}
                onChange={(e) => onProfileChange('qual_medicamento', e.target.value)}
                placeholder="Ex: Insulina (horários), Ritalina (doses), etc."
              />
            </div>
          )}
        </div>

        {/* Plano de Saúde */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="plano_de_saude"
              checked={profile.plano_de_saude}
              onCheckedChange={(checked) => onProfileChange('plano_de_saude', checked)}
            />
            <Label htmlFor="plano_de_saude">Possui plano de saúde?</Label>
          </div>
          {profile.plano_de_saude && (
            <div className="mt-2">
              <Label htmlFor="qual_plano">Nome do Plano de Saúde</Label>
              <Input
                id="qual_plano"
                value={profile.qual_plano || ''}
                onChange={(e) => onProfileChange('qual_plano', e.target.value)}
                placeholder="Ex: Unimed, Bradesco Saúde"
              />
            </div>
          )}
        </div>
      </div>
    </div>
    )
}
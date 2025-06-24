import InputWithIcon from "@/components/InputWithIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PessoaApiData } from "@/src/service/pessoaService";
import { UserProfile } from "@/src/types/userProfile";
import { Church } from "lucide-react";

interface ParoquiaSacramentosProps {
  profile: PessoaApiData;
  onProfileChange: (field: keyof PessoaApiData, value: any) => void;
}

export default function ParoquiaSacramentos(props:ParoquiaSacramentosProps){
    const profile = props.profile
    const onProfileChange = props.onProfileChange
    return(
        <div className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Paróquia e Sacramentos
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
         <InputWithIcon
            id="paroquia"
            labelText="Paróquia que participa"
            icon={Church}
            value={profile.paroquia}
            onChange={(e) => props.onProfileChange('paroquia', e.target.value)}
            error=""
            placeholder="Nome da sua paróquia"
        />
      
        
        <div className="flex flex-col gap-2 md:col-span-2">
          <Label className="text-gray-800 text-lg font-medium mb-2">Sacramentos que já possui:</Label>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="batizado"
                checked={profile.batizado}
                onCheckedChange={(checked) => onProfileChange('batizado', checked)}
              />
              <Label htmlFor="batizado">batizado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eucaristia"
                checked={profile.eucaristia}
                onCheckedChange={(checked) => onProfileChange('eucaristia', checked)}
              />
              <Label htmlFor="eucaristia">Eucaristia</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="crisma"
                checked={profile.crisma}
                onCheckedChange={(checked) => onProfileChange('crisma', checked)}
              />
              <Label htmlFor="crisma">Crisma</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="matrimonio"
                checked={profile.matrimonio}
                onCheckedChange={(checked) => onProfileChange('matrimonio', checked)}
              />
              <Label htmlFor="matrimonio">Matrimônio</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
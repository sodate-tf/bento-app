import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/src/types/userProfile";

interface ParoquiaSacramentosProps {
  profile: UserProfile;
  onProfileChange: (field: keyof UserProfile, value: any) => void;
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
        <div className="md:col-span-2">
          <Label htmlFor="paroquiaParticipa">Paróquia que participa (Opcional)</Label>
          <Input
            id="paroquiaParticipa"
            value={profile.paroquiaParticipa}
            onChange={(e) => onProfileChange('paroquiaParticipa', e.target.value)}
            placeholder="Nome da sua paróquia"
          />
        </div>
        
        <div className="flex flex-col gap-2 md:col-span-2">
          <Label className="text-gray-800 text-lg font-medium mb-2">Sacramentos que já possui:</Label>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="batismo"
                checked={profile.batismo}
                onCheckedChange={(checked) => onProfileChange('batismo', checked)}
              />
              <Label htmlFor="batismo">Batismo</Label>
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
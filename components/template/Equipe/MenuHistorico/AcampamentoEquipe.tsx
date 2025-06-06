import { Label } from "@/components/ui/label";
interface AcampabentoEquipeProps{
    uid: string
}
export default function AcampamentoEquipe(props: AcampabentoEquipeProps){
    return(
        <div className="flex flex-col mt-3">
            <Label className="text-xs font-medium ">Acampabento: VII Acampabento</Label>
            <Label className="text-xs font-light text-red-950">Equipe: Caridade</Label>
        </div>
    )
}